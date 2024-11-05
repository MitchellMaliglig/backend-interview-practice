import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { Movie, deleteMovie, getMovies, saveMovie } from "./lib/data";
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

  async function handleSaveMovie(e: FormEvent<HTMLFormElement>) {
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
      console.log("movie added");
      const savedMovie = await saveMovie(movie);
      if (savedMovie){
        const newMovies = [...movies, savedMovie];
        setMovies(newMovies);
      }
      form.reset();
    } else {
      console.log("movie not added");
    }
  }

  function handleEditMovie(movieId: number) {
    console.log(`editing movie with id: ${movieId}`);
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
      <MovieForm onSaveMovie={handleSaveMovie} />
      {movies.map((m, i) => (
        <MovieCard
          movie={m}
          onEditMovie={handleEditMovie}
          onDeleteMovie={handleDeleteMovie}
          key={i}
        />
      ))}
    </>
  );
}

export default App;
