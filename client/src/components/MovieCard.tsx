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
  const [isOpenDelete, setOpenDelete] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleOpenDelete(){
    setOpenDelete(true);
  }

  function handleCancel() {
    setOpen(false);
  }

  function handleCancelDelete(){
    setOpenDelete(false);
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
          <button onClick={handleOpenDelete}>Delete movie</button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleCancel}>
        <p>Do you wish to edit the movie "{movie.title}"?</p>
        <MovieForm onSaveMovie={onSaveMovie} onCancel={handleCancel} movie={movie}/>
      </Modal>
      <Modal isOpen={isOpenDelete} onClose={handleCancel}>
        <p>Do you wish to delete the movie "{movie.title}"</p>
        <div className="movie-buttons">
          <button onClick={handleCancelDelete}>Close</button>
          <button onClick={() => {onDeleteMovie(movie.movieId!)}}>Delete movie</button>
        </div>
      </Modal>
    </>
  );
}
