import 'dotenv/config';
import express from 'express';
import { Pool } from 'pg';

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

// get all movies
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
        res.status(500).json({ error: 'Error fetching movies' });
    }
});

// insert a movie
app.post('/api/movies', async (req, res) =>{
    try{
        const {title, summary, link, rating} = req.body;
        if (!title || !summary || !link || !rating){
            console.error('title, summary, link, & rating required');
            res.status(400).json({ error: 'title, summary, link, & rating required' });
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
        res.status(500).json({ error: 'Error inserting movie' });
    }
});

// update a movie
app.put('/api/movies/:movieId', async (req, res) =>{
    try{
        const {movieId} = req.params;
        const {title, summary, link, rating} = req.body;
        if (!movieId || !title || !summary || !link || !rating){
            console.error('movieId, title, summary, link, & rating are required');
            res.status(400).json({ error: 'movieId, title, summary, link, & rating are required' });
        }
        if (!validateMovieId(movieId)){
            console.error('movieId is not an int');
            res.status(400).json({ error: 'movieId is not an int' });
        }
        const sql = `
            UPDATE "movies" 
            SET "title" = $2 , "summary" = $3, "link" = $4, "rating" = $5
            WHERE "movieId" = $1
            RETURNING *;
        `;
        const params = [movieId, title, summary, link, rating];
        const result = await pool.query(sql, params);
        const [movie] = result.rows;
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({error: `movie ${movieId} not found`});
        }
    } catch (err){
        console.error(err);
        res.status(500).json({ error: 'Error updating movies' });
    }
}); 

// delete a movie
app.delete('/api/movies/:movieId', async (req, res) => {
    try {
      const { movieId } = req.params;
      if (!movieId){
        console.error('movieId is required');
        res.status(400).json({ error: 'movieId is required' });
      }
      if (!validateMovieId(movieId)){
        console.error('movieId is not an int');
        res.status(400).json({ error: 'movieId is not an int' });
      }
      const sql = `
        DELETE FROM "movies"
        WHERE "movieId" = $1
        RETURNING *;
      `;
      const params = [movieId];
      const result = await pool.query(sql, params);
      const movie = result.rows[0];
      if (movie) {
        res.sendStatus(204);
      } else {
        res.status(404).json({error: `movie ${movieId} not found`});
      }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting movies' });
    }
  });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function validateMovieId(movieId: string): boolean{
    return Number.isInteger(movieId);
}