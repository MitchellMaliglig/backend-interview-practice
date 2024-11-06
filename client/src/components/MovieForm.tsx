import { FormEvent } from "react";

type movieFormProps = {
  onAddMovie?: (e: FormEvent<HTMLFormElement>) => void;
  onSaveMovie?: (e: FormEvent<HTMLFormElement>, newMovieId: number) => void;
  onCancel?: () => void;
  movieId?: number;
};

export function MovieForm({
  onAddMovie,
  onSaveMovie,
  onCancel,
  movieId,
}: movieFormProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (movieId !== undefined && onSaveMovie) {
      onSaveMovie(e, movieId);
    } else if (onAddMovie) {
      onAddMovie(e);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <label>
          title<input name="title" placeholder="insert title"></input>
        </label>
        <label>
          summary<input name="summary" placeholder="insert summary"></input>
        </label>
      </div>
      <div className="row">
        <label>
          link<input name="link" placeholder="insert link"></input>
        </label>
        <label>
          rating
          <input
            name="rating"
            type="number"
            defaultValue={1}
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
