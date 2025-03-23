import { useEffect, useState, useRef } from 'react';
import {
  useParams,
  Link,
  useLocation,
  Outlet,
} from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../../api/tmdb';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await getMovieDetails(movieId);
        setMovie(response.data);
      } catch (err) {
        setError('Film detayları alınamadı.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  const { title, overview, poster_path, genres } = movie;

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current} className={styles.back}>
        ← Go back
      </Link>

      <div className={styles.details}>
        {poster_path && (
          <img
            src={getImageUrl(poster_path)}
            alt={title}
            className={styles.poster}
          />
        )}
        <div className={styles.info}>
          <h1>{title}</h1>
          <p><strong>Overview:</strong> {overview}</p>
          <p>
            <strong>Genres:</strong>{' '}
            {genres.map((g) => g.name).join(', ')}
          </p>
        </div>
      </div>

      <div className={styles.links}>
        <h3>Additional Info</h3>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
