const express = require('express');
const app = express();
const { Pool } = require('pg');
const path = require('path'); // За работа със статични файлове

// Настройка за връзка с PostgreSQL, използвайки DATABASE_URL от Heroku
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

app.use(express.json());

// Сервиране на статични файлове от директорията 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware за удостоверяване на API ключ с Bearer токен
app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  const apiKey = process.env.API_KEY;

  if (authHeader && authHeader === `Bearer ${apiKey}`) {
    next(); // Ако API ключът е правилен, продължаваме
  } else {
    res.status(403).json({ error: "Неоторизиран достъп. Невалиден API ключ." });
  }
});

// Функция за създаване на таблици
async function createTables() {
  const client = await pool.connect();
  console.log("Свързване с базата данни е успешно.");

  try {
    // Таблица за потребители
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        goal VARCHAR(100),
        diet_plan VARCHAR(100)
      );
    `);
    console.log("Таблицата 'users' е създадена успешно.");

    // Таблица за диетични планове
    await client.query(`
      CREATE TABLE IF NOT EXISTS diet_plans (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        plan_details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Таблицата 'diet_plans' е създадена успешно.");

    // Таблица за въпросника
    await client.query(`
      CREATE TABLE IF NOT EXISTS questionnaire_responses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        responses JSONB,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Таблицата 'questionnaire_responses' е създадена успешно.");

    // Таблица за препоръки
    await client.query(`
      CREATE TABLE IF NOT EXISTS recommendations (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        recommendations TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Таблицата 'recommendations' е създадена успешно.");

    // Таблица за статии
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        content TEXT,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Таблицата 'articles' е създадена успешно.");

  } catch (err) {
    console.error("Грешка при създаване на таблиците:", err);
  } finally {
    client.release();
  }
}

// Извикване на функцията за създаване на таблици
createTables().catch(err => console.error("Грешка при инициализация на таблиците:", err));

// Крайна точка за началната страница
app.get('/', (req, res) => {
  res.send("Приложението работи! Добре дошли в Health Platform API.");
});

// Крайна точка за извличане на профили
app.get('/profiles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error("Грешка при извличане на профилите:", err);
    res.status(500).send("Грешка при извличане на профилите.");
  }
});

// Крайна точка за добавяне на нов профил
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

// Крайна точка за съхранение на отговорите от въпросника
app.post('/questionnaire', async (req, res) => {
  const { user_id, responses } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO questionnaire_responses (user_id, responses) VALUES ($1, $2) RETURNING *',
      [user_id, responses]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Грешка при съхранение на отговорите от въпросника:", err);
    res.status(500).send("Грешка при съхранение на отговорите от въпросника.");
  }
});

// Крайна точка за генериране на препоръки
app.post('/recommendations', async (req, res) => {
  const { user_id, recommendations } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO recommendations (user_id, recommendations) VALUES ($1, $2) RETURNING *',
      [user_id, recommendations]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Грешка при добавяне на препоръки:", err);
    res.status(500).send("Грешка при добавяне на препоръки.");
  }
});

// Крайна точка за извличане на статии
app.get('/articles', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM articles');
    res.json(result.rows);
  } catch (err) {
    console.error("Грешка при извличане на статиите:", err);
    res.status(500).send("Грешка при извличане на статиите.");
  }
});

// Крайна точка за добавяне на нова статия
app.post('/articles', async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Грешка при добавяне на нова статия:", err);
    res.status(500).send("Грешка при добавяне на нова статия.");
  }
});

// Крайна точка за свързаност с PostgreSQL (тестова крайна точка)
app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error("Грешка при свързаност с базата данни:", err);
    res.status(500).send("Грешка при свързаност с базата данни.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
