import { FormEvent, useEffect, useState } from 'react'
import './App.css'
import { Movie, getMovies, saveMovie } from './lib/data'
import { MovieCard } from './components/MovieCard';
import './movie.css'
import { MovieForm } from './components/MovieForm';

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

  function handleSaveMovie(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const movie: Movie = {
      title: data.get('title') as string,
      summary: data.get('summary') as string,
      link: data.get('link') as string,
      rating: Number(data.get('rating') as string),
    }; 
    if (movie.title && movie.link && movie.summary){
      console.log('movie added');
      saveMovie(movie);
      const newMovies = [...movies, movie];
      setMovies(newMovies);
      e.currentTarget.reset();  
    } else{
      console.log('movie not added');
    }
  }

  return (
    <>
      <h1>Movies</h1>
      <MovieForm onSaveMovie={handleSaveMovie}/>
      {movies.map((m, i) => (
        <MovieCard movie={m} key={i}/>
      ))}
    </>
  )
}

export default App;