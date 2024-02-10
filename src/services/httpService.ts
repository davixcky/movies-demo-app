import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://api.themoviedb.org',
  timeout: 1000,
});

httpClient.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${import.meta.env.VITE_TMDB_READ_KEY}`;

    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);
