import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { Movie, deleteMovie, getMovies, saveMovie, updateMovie } from "./lib/data";
import { MovieCard } from "./components/MovieCard";
import "./movie.css";
import { MovieForm } from "./components/MovieForm";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const fetchedMovies = await getMovies();
      if (fetchedMovies) {
        setMovies(fetchedMovies);
      } else {
        console.error("error fetching movies");
      }
    }
    fetchMovies();
  }, []);

  async function handleAddMovie(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const movie: Movie = {
      title: data.get("title") as string,
      summary: data.get("summary") as string,
      link: data.get("link") as string,
      rating: Number(data.get("rating") as string),
    };
    if (movie.title && movie.link && movie.summary) {
      const savedMovie = await saveMovie(movie);
      if (savedMovie){
        console.log("movie added");
        const newMovies = [...movies, savedMovie];
        setMovies(newMovies);
      }
      form.reset();
    } else {
      console.log("movie not added");
    }
  }

  async function handleSaveMovie(e: FormEvent<HTMLFormElement>, newMovieId: number) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const movie: Movie = {
      title: data.get("title") as string,
      summary: data.get("summary") as string,
      link: data.get("link") as string,
      rating: Number(data.get("rating") as string),
      movieId: newMovieId,
    };
    if (movie.title && movie.link && movie.summary) {
      const updatedMovie = await updateMovie(movie);
      if (updatedMovie){
        console.log(`edited movie with id: ${updatedMovie?.movieId}`);
        const index = movies.findIndex((m) => m.movieId === updatedMovie.movieId);
        const newMovies = [...movies];
        newMovies[index] = updatedMovie;
        setMovies(newMovies);
      }
      form.reset();
    } else {
      console.log("movie not edited");
    }
  }

  async function handleDeleteMovie(movieId: number) {
    const index = movies.findIndex((m) => m.movieId === movieId);
    if (index !== -1){
      await deleteMovie(movieId);
      const newMovies = [...movies];
      newMovies.splice(index, 1);
      setMovies(newMovies);
    }
    console.log(`deleted movie with id: ${movieId}`);
  }

  return (
    <>
      <h1>Movies</h1>
      <MovieForm onAddMovie={handleAddMovie} />
      {movies.map((m, i) => (
        <MovieCard
          movie={m}
          onSaveMovie={handleSaveMovie}
          onDeleteMovie={handleDeleteMovie}
          key={i}
        />
      ))}
    </>
  );
}

export default App;
