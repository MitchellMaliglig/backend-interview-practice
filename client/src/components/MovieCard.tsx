import { FormEvent, useState } from "react";
import { Movie } from "../lib/data";
import { Modal } from "./Modal";
import { MovieForm } from "./MovieForm";

type movieCardProps = {
  movie: Movie;
  onSaveMovie: (e: FormEvent<HTMLFormElement>, newMovieId: number) => void;
  onDeleteMovie: (movieId: number) => void;
};

export function MovieCard({
  movie,
  onSaveMovie,
  onDeleteMovie,
}: movieCardProps) {
  const [isOpen, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleCancel() {
    setOpen(false);
  }

  return (
    <>
      <div className="movie-card">
        <h2>{movie.title}</h2>
        <p>{movie.summary}</p>
        <a href={movie.link}>{movie.link}</a>
        <p>Rating: {movie.rating}</p>
        <div className="movie-buttons">
          <button onClick={handleOpen}>Edit movie</button>
          <button onClick={() => {onDeleteMovie(movie.movieId!)}}>Delete movie</button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleCancel}>
        <p>Do you wish to edit the movie "{movie.title}"?</p>
        <MovieForm onSaveMovie={onSaveMovie} onCancel={handleCancel} movieId={movie.movieId}/>
      </Modal>
    </>
  );
}
