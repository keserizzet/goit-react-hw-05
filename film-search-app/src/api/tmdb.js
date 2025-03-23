import axios from 'axios';

const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDVmNGQ5YmFjNmVmZTUwZDI3Y2NiM2UxNGViMTUyYyIsIm5iZiI6MTc0MjcwMzk1MC40ODk5OTk4LCJzdWIiOiI2N2RmOGQ0ZTM1YmQyNmE3ZDk0ZDg0MWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mzuSBqkWbnBBwUhVn7njWYx1xTp9DFE4mCJa8LHxCag';
const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_TOKEN,
  },
});

export const fetchTrendingMovies = () => axiosInstance.get('/trending/movie/day');
export const searchMovies = (query) =>
  axiosInstance.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });

export const getMovieDetails = (id) => axiosInstance.get(`/movie/${id}`);
export const getMovieCredits = (id) => axiosInstance.get(`/movie/${id}/credits`);
export const getMovieReviews = (id) => axiosInstance.get(`/movie/${id}/reviews`);
export const getImageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;
