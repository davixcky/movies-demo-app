import { useSuspenseQuery } from '@tanstack/react-query';
import { MainLayout } from '../../components/layouts/mainLayout.tsx';
import { MoviesGrid } from '../../components/layouts/moviesGrid/moviesGrid.tsx';
import styles from './home.module.css';
import {
  genresListQueryOptions,
  trendingMoviesQueryOptions,
} from '../../services/query/options.ts';
import { MovieList } from '../../components/features/movieList/movieList.tsx';

export const HomePage = () => {
  const trendingMovies = useSuspenseQuery(trendingMoviesQueryOptions);
  const genresResponse = useSuspenseQuery(genresListQueryOptions);

  const genres = genresResponse.data.data.genres;
  const movies = trendingMovies.data.data.results.slice(0, 5);
  const otherMovies = trendingMovies.data.data.results.slice(5, 10);

  return (
    <MainLayout>
      <MoviesGrid movies={movies} genres={genres} />
      <p className={styles.more_movies_title}>More like this</p>
      <MovieList movies={otherMovies} genres={genres} />
    </MainLayout>
  );
};
