import { useEffect, useState } from 'react'
import './App.css'
import { Movie, getMovies } from './lib/data'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() =>{
    async function fetchMovies(){
      const fetchedMovies = await getMovies();
      if (fetchedMovies){
        setMovies(fetchedMovies);
      } else{
        console.error('error fetching movies')
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      {movies.map((m) => (
        <div key={m.movieId}>
          <h2>{m.title}</h2>
          <p>{m.summary}</p>
          <a href={m.link}>{m.link}</a>
          <p>Rating: {m.rating}</p>
        </div>
      ))}
    </>
  )
}

export default App;