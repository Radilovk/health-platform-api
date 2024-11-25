const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const router = express.Router();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

/** POST: Запазване на данни във въпросника */
router.post('/questionnaire', async (req, res) => {
    try {
        const {
            name, email, phone, password, gender, age, ethnicity,
            health_issues, allergies, medications, digestive_issues,
            diet, meals_per_day, snacks, preferred_drinks,
            activity_level, sleep_hours, exercise_frequency,
            goals, additional_info
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            `INSERT INTO questionnaire (
                name, email, phone, password_hash, gender, age, ethnicity,
                health_issues, allergies, medications, digestive_issues,
                diet, meals_per_day, snacks, preferred_drinks,
                activity_level, sleep_hours, exercise_frequency,
                goals, additional_info
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`,
            [
                name,
                email,
                phone,
                hashedPassword,
                gender,
                age,
                ethnicity,
                health_issues === 'yes',
                allergies === 'yes',
                medications === 'yes',
                digestive_issues || null,
                diet,
                meals_per_day,
                snacks === 'yes',
                preferred_drinks,
                activity_level,
                sleep_hours,
                exercise_frequency,
                goals,
                additional_info || null,
            ]
        );

        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save form data.' });
    }
});

/** GET: Извличане на данни от въпросника */
router.get('/questionnaire', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM questionnaire');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve data.' });
    }
});

/** PUT: Актуализация на данни */
router.put('/questionnaire/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        // Генериране на динамична SQL заявка за актуализация
        const fields = Object.keys(updates)
            .map((key, idx) => `${key} = $${idx + 1}`)
            .join(', ');
        const values = Object.values(updates);

        await pool.query(
            `UPDATE questionnaire SET ${fields} WHERE id = $${values.length + 1}`,
            [...values, id]
        );

        res.status(200).json({ message: 'Record updated successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update record.' });
    }
});

/** DELETE: Изтриване на запис */
router.delete('/questionnaire/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM questionnaire WHERE id = $1', [id]);
        res.status(200).json({ message: 'Record deleted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete record.' });
    }
});

module.exports = router;
