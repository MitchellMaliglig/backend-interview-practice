import { useState } from "react";
import { Movie } from "../lib/data";
import { Modal } from "./Modal";

type movieCardProps = {
  movie: Movie;
  onEditMovie: (movieId: number) => void;
  onDeleteMovie: (movieId: number) => void;
};

export function MovieCard({
  movie,
  onEditMovie,
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
          <button onClick={() => {if (movie.movieId) {handleOpen()}}}>Edit movie</button>
          <button onClick={() => {if (movie.movieId) {onDeleteMovie(movie.movieId)}}}>Delete movie</button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleCancel}>
        <p>Do you wish to edit the movie "{movie.title}"?</p>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={() => {if (movie.movieId) {handleCancel()}}}>Save</button>
      </Modal>
    </>
  );
}
