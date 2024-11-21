import { FormEvent } from "react";
import { Movie } from "../lib/data";

type movieFormProps = {
  onAddMovie?: (e: FormEvent<HTMLFormElement>) => void;
  onSaveMovie?: (e: FormEvent<HTMLFormElement>, newMovieId: number) => void;
  onCancel?: () => void;
  movie?: Movie;
};

export function MovieForm({
  onAddMovie,
  onSaveMovie,
  onCancel,
  movie,
}: movieFormProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (movie && onSaveMovie && onCancel) {
      onSaveMovie(e, movie.movieId!);
      onCancel();
    } else if (onAddMovie) {
      onAddMovie(e);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <label>
          title
          <input
            name="title"
            placeholder="insert title"
            defaultValue={movie?.title}
          ></input>
        </label>
        <label>
          summary
          <input
            name="summary"
            placeholder="insert summary"
            defaultValue={movie?.summary}
          ></input>
        </label>
      </div>
      <div className="row">
        <label>
          link
          <input
            name="link"
            placeholder="insert link"
            defaultValue={movie?.link}
          ></input>
        </label>
        <label>
          rating
          <input
            name="rating"
            type="number"
            defaultValue={movie?.rating || 1}
            min={1}
            max={5}
          ></input>
        </label>
      </div>
      {onAddMovie && <button>Add movie</button>}
      {onSaveMovie && (
        <div className="movie-buttons">
          <button type="button" onClick={onCancel}>
            Close
          </button>
          <button type="submit">Save</button>
        </div>
      )}
    </form>
  );
}
