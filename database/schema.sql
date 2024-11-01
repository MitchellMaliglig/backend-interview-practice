-- schema.sql

DROP TABLE IF EXISTS movies CASCADE;

CREATE TABLE movies (
    "movieId" SERIAL PRIMARY KEY,
    "title" TEXT,
    "summary" TEXT, 
    "link" TEXT,
    "rating" INT CHECK ("rating" >= 1 AND "rating" <= 5)  -- CHECK constraint for rating
);
