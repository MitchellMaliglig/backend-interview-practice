export type Movie = {
  title: string;
  summary: string;
  link: string;
  rating: number;
  movieId?: number;
};

export async function getMovies(): Promise<Movie[] | null> {
  const url = "http://localhost:3000/api/movies";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Response status: ${res.status}`);
    return (await res.json()) as Movie[];
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function saveMovie(movie: Movie): Promise<Movie | null> {
  const url = "http://localhost:3000/api/movies";
  try {
    const req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    }
    const res = await fetch(url, req);
    if (!res.ok) throw new Error(`Response status: ${res.status}`);
    return (await res.json()) as Movie;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function updateMovie(movie: Movie): Promise<Movie | null> {
  const url = `http://localhost:3000/api/movies/${movie.movieId}`;
  try {
    const req = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    };
    const res = await fetch(url, req);
    if (!res.ok) throw new Error(`Response status: ${res.status}`);
    return (await res.json()) as Movie;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteMovie(movieId: number): Promise<void> {
  const url = `http://localhost:3000/api/movies/${movieId}`;
  try{
    const req = {
      method: "DELETE",
    };
    const res = await fetch(url, req);
    if (!res.ok) throw new Error(`Response status: ${res.status}`);
  } catch(err){
    console.error(err);
  }
}
