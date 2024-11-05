import { Movie } from "../lib/data";

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
  return (
    <>
      <div className="movie-card">
        <h2>{movie.title}</h2>
        <p>{movie.summary}</p>
        <a href={movie.link}>{movie.link}</a>
        <p>Rating: {movie.rating}</p>
        <div className="movie-buttons">
          <button onClick={() => {if (movie.movieId) {onEditMovie(movie.movieId)}}}>Edit movie</button>
          <button onClick={() => {if (movie.movieId) {onDeleteMovie(movie.movieId)}}}>Delete movie</button>
        </div>
      </div>
    </>
  );
}
