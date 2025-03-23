import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const response = await fetchTrendingMovies();
        setMovies(response.data.results);
      } catch (err) {
        setError('Filmler alınırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Trending Movies</h1>
      {loading && <p>Yükleniyor...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default HomePage;
