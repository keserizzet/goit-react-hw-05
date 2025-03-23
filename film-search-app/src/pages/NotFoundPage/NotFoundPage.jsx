import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h1>404 - Sayfa Bulunamadı</h1>
      <p>Ana sayfaya yönlendiriliyorsunuz...</p>
    </div>
  );
}

export default NotFoundPage;
