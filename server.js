const express = require('express');
const app = express();
const { Pool } = require('pg');
const path = require('path');

// Настройка за връзка с PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware за удостоверяване на API ключ
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const apiKey = process.env.API_KEY;

  if (authHeader && authHeader === `Bearer ${apiKey}`) {
    next(); 
  } else {
    res.status(403).json({ error: "Неоторизиран достъп. Невалиден API ключ." });
  }
}

// Прилагане на Middleware за удостоверяване само за API маршрутите
app.use(['/profiles', '/diet-plans', '/recommendations', '/articles', '/progress', '/products', '/goals'], authMiddleware);

// Функция за създаване на таблици
async function createTables() {
  const client = await pool.connect();
  console.log("Свързване с базата данни е успешно.");

  try {
    // Основни таблици
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        goal VARCHAR(100),
        diet_plan VARCHAR(100)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS diet_plans (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        plan_details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS questionnaire_responses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        responses JSONB,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS recommendations (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        recommendations TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        content TEXT,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Таблица за цели
    await client.query(`
      CREATE TABLE IF NOT EXISTS goals (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        goal_type VARCHAR(100),
        target_value DECIMAL,
        start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        end_date TIMESTAMP
      );
    `);

    // Добавяне на measurements колона в progress, ако не съществува
    await client.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name='progress' AND column_name='measurements') THEN
          ALTER TABLE progress ADD COLUMN measurements JSONB;
        END IF;
      END $$;
    `);

    // Таблица за прогрес с measurements
    await client.query(`
      CREATE TABLE IF NOT EXISTS progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        weight DECIMAL,
        entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        measurements JSONB
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        description TEXT,
        price DECIMAL,
        stock INTEGER,
        image_url VARCHAR(255)
      );
    `);

  } catch (err) {
    console.error("Грешка при създаване на таблиците:", err);
  } finally {
    client.release();
  }
}

// Извикване на функцията за създаване на таблици
createTables().catch(err => console.error("Грешка при инициализация на таблиците:", err));

// Крайни точки за управление на потребителски профили
app.get('/profiles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error("Грешка при извличане на профилите:", err);
    res.status(500).send("Грешка при извличане на профилите.");
  }
});

app.post('/profiles', async (req, res) => {
  const { name, goal, diet_plan } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, goal, diet_plan) VALUES ($1, $2, $3) RETURNING *',
      [name, goal, diet_plan]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Грешка при добавяне на нов профил:", err);
    res.status(500).send("Грешка при добавяне на нов профил.");
  }
});

// Управление на цели
app.get('/goals', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM goals');
    res.json(result.rows);
  } catch (err) {
    console.error("Грешка при извличане на целите:", err);
    res.status(500).send("Грешка при извличане на целите.");
  }
});

app.post('/goals', async (req, res) => {
  const { user_id, goal_type, target_value, end_date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO goals (user_id, goal_type, target_value, end_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, goal_type, target_value, end_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Грешка при добавяне на нова цел:", err);
    res.status(500).send("Грешка при добавяне на нова цел.");
  }
});

app.put('/goals/:id', async (req, res) => {
  const { id } = req.params;
  const { goal_type, target_value, end_date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE goals SET goal_type = $1, target_value = $2, end_date = $3 WHERE id = $4 RETURNING *',
      [goal_type, target_value, end_date, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Грешка при актуализиране на целта:", err);
    res.status(500).send("Грешка при актуализиране на целта.");
  }
});

app.delete('/goals/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM goals WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error("Грешка при изтриване на целта:", err);
    res.status(500).send("Грешка при изтриване на целта.");
  }
});

// Управление на прогрес
app.post('/progress', async (req, res) => {
  const { user_id, weight, measurements } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO progress (user_id, weight, measurements) VALUES ($1, $2, $3) RETURNING *',
      [user_id, weight, measurements]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Грешка при добавяне на прогрес:", err);
    res.status(500).send("Грешка при добавяне на прогрес.");
  }
});

// Старт на сървъра
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
