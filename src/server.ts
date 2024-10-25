import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// PostgreSQL client setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Test endpoint to check database connection
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Database connected successfully:', result.rows[0]);
        res.json({ message: 'Database is connected', time: result.rows[0].now });
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).json({ error: 'Database connection error' });
    }
});

// Endpoint to get all users
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Endpoint to get all posts
app.get('/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
