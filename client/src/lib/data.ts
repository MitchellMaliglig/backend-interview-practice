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
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json: Movie[] = await response.json();
    return json;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function saveMovie(movie: Movie): Promise<Movie | null> {
  const url = "http://localhost:3000/api/movies";
  try{
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json: Movie = await response.json();
    return json;
  } catch (err){
    console.error(err);
    return null;
  }
}
