const express = require('express');
const app = express();
const { Pool } = require('pg');

// Настройка за връзка с PostgreSQL, използвайки DATABASE_URL от Heroku
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

app.use(express.json());

// Функция за създаване на таблици
async function createTables() {
  const client = await pool.connect();
  console.log("Свързване с базата данни е успешно.");

  try {
    // Създаване на таблица за потребители
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        goal VARCHAR(100),
        diet_plan VARCHAR(100)
      );
    `);
    console.log("Таблицата 'users' е създадена успешно.");

    // Създаване на таблица за диетични планове
    await client.query(`
      CREATE TABLE IF NOT EXISTS diet_plans (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        plan_details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Таблицата 'diet_plans' е създадена успешно.");

  } catch (err) {
    console.error("Грешка при създаване на таблиците:", err);
  } finally {
    client.release();
  }
}

// Извикване на функцията за създаване на таблици
createTables().catch(err => console.error("Грешка при инициализация на таблиците:", err));

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
