const express = require('express');
const app = express();
const { Pool } = require('pg');

// Свързване с PostgreSQL чрез Heroku
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.json());

// Функция за създаване на таблици
async function createTables() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        goal VARCHAR(100),
        diet_plan VARCHAR(100)
      );
    `);

    console.log("Таблицата 'users' е създадена успешно (ако не е съществувала).");

    // Добави други таблици, ако са необходими
    await client.query(`
      CREATE TABLE IF NOT EXISTS diet_plans (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        plan_details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Таблицата 'diet_plans' е създадена успешно (ако не е съществувала).");

  } catch (err) {
    console.error("Грешка при създаване на таблиците:", err);
  } finally {
    client.release();
  }
}

// Извикване на функцията за създаване на таблици
createTables();
const express = require('express');
const app = express();
const { Pool } = require('pg');

// Свързване с PostgreSQL чрез Heroku
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.json());

// Примерен профил
let profiles = [
  { id: '1', name: 'John Doe', goal: 'Lose Weight', dietPlan: 'Low Carb' },
  { id: '2', name: 'Jane Smith', goal: 'Gain Muscle', dietPlan: 'High Protein' }
];

// Крайна точка за извличане на профили
app.get('/profiles', (req, res) => {
  res.json(profiles);
});

// Крайна точка за добавяне на профил
app.post('/profiles', (req, res) => {
  const newProfile = req.body;
  profiles.push(newProfile);
  res.status(201).json(newProfile);
});

// Примерна свързаност с PostgreSQL
app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
