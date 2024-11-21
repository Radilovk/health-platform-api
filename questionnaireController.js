const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const router = express.Router();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

router.post('/questionnaire', async (req, res) => {
    try {
        const {
            name, email, phone, password, gender, age, goals
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            `INSERT INTO questionnaire (
                name, email, phone, password_hash, gender, age, goals
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [name, email, phone, hashedPassword, gender, age, goals]
        );

        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save form data.' });
    }
});

module.exports = router;
