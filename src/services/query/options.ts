import { queryOptions } from '@tanstack/react-query';
import {
  KEY_GET_CAST_BY_MOVIE_ID,
  KEY_GET_MOVIE_BY_ID,
  KEY_GET_RECOMMENDATION_BY_MOVIE_ID,
  KEY_LIST_GENRES,
  KEY_TRENDING_MOVIES,
} from '../const.ts';
import {
  getCastByMovieId,
  getGenres,
  getMovieById,
  getRecommendationByMovieId,
  getTrendingMovies,
} from '../movies.ts';

export const genresListQueryOptions = queryOptions({
  queryKey: KEY_LIST_GENRES,
  queryFn: getGenres,
});

export const movieDetailsQueryOptions = (movieID: string) =>
  queryOptions({
    queryKey: KEY_GET_MOVIE_BY_ID(movieID),
    queryFn: () => getMovieById(movieID),
  });

export const movieCastQueryOptions = (movieID: string) =>
  queryOptions({
    queryKey: KEY_GET_CAST_BY_MOVIE_ID(movieID),
    queryFn: () => getCastByMovieId(movieID),
  });

export const movieRecommendationsQueryOptions = (movieID: string) =>
  queryOptions({
    queryKey: KEY_GET_RECOMMENDATION_BY_MOVIE_ID(movieID),
    queryFn: () => getRecommendationByMovieId(movieID),
  });

export const trendingMoviesQueryOptions = queryOptions({
  queryKey: KEY_TRENDING_MOVIES,
  queryFn: getTrendingMovies,
});
