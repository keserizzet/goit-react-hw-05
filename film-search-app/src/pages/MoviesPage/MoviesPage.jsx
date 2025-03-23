import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchTerm = searchParams.get('query');
    if (!searchTerm) return;

    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await searchMovies(searchTerm);
        setMovies(response.data.results);
      } catch (err) {
        setError('Film aranırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery === '') return;
    setSearchParams({ query: trimmedQuery });
  };

  return (
    <div className={styles.container}>
      <h1>Film Ara</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Film adı girin..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Ara
        </button>
      </form>

      {loading && <p>Yükleniyor...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;
