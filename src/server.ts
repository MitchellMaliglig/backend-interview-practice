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

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Request body:', req.body);
    next();
});

app.get('/api/movies', async (req, res) =>{
    try{
        const sql = `
            SELECT * FROM "movies";
        `;
        const result = await pool.query(sql);
        const movies = result.rows;
        res.status(200).json(movies);
    } catch (err){
        console.error(err);
    }
});

app.post('/api/movies', async (req, res) =>{
    try{
        const {title, summary, link, rating} = req.body;
        if (!title || !summary || !link || !rating){
            console.error('Title, summary, link, & rating required');
        }
        const sql = `
            INSERT INTO "movies" ("title", "summary", "link", "rating")
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const params = [title, summary, link, rating];
        const result = await pool.query(sql, params);
        const [movie] = result.rows;
        res.status(201).json(movie);
    } catch (err){
        console.error(err);
    }
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
