import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits, getImageUrl } from '../../api/tmdb';
import styles from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const response = await getMovieCredits(movieId);
        setCast(response.data.cast);
      } catch (err) {
        setError('Oyuncular yüklenemedi.');
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;
  if (cast.length === 0) return <p>Oyuncu bilgisi bulunamadı.</p>;

  return (
    <ul className={styles.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={styles.item}>
          {actor.profile_path ? (
            <img
              src={getImageUrl(actor.profile_path)}
              alt={actor.name}
              className={styles.img}
            />
          ) : (
            <div className={styles.placeholder}>No Image</div>
          )}
          <p>{actor.name}</p>
          <p className={styles.character}>as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
