export type Movie = {
    title: string;
    summary: string;
    link: string;
    rating: number;
    movieId: number;
}

export async function getMovies(): Promise<Movie[] | null> {
    const url = 'http://localhost:3000/api/movies';
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json: Movie[] = await response.json();
      return json;
    } catch (err) {
      return null;
    }
}
