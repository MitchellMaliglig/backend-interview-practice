import { Movie } from "../lib/data";

type movieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: movieCardProps) {
  return (
    <>
      <div className="movie-card">
        <h2>{movie.title}</h2>
        <p>{movie.summary}</p>
        <a href={movie.link}>{movie.link}</a>
        <p>Rating: {movie.rating}</p>
      </div>
    </>
  );
}
