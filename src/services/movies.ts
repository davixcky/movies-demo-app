import { httpClient } from './httpService.ts';
import {
  GetCastAndCrewResponse,
  GetGenresResponse,
  GetMoviesResponse,
  Movie,
} from './moviesType.ts';

export const getTrendingMovies = async () => {
  return httpClient.get<GetMoviesResponse>('/3/trending/movie/day');
};

export const getGenres = async () => {
  return httpClient.get<GetGenresResponse>('/3/genre/movie/list');
};

export const getMovieById = async (id: string) => {
  return httpClient.get<Movie>(`/3/movie/${id}?append_to_response=videos`);
};

export const getCastByMovieId = async (id: string) => {
  return httpClient.get<GetCastAndCrewResponse>(`/3/movie/${id}/credits`);
};

export const getRecommendationByMovieId = async (id: string) => {
  return httpClient.get<GetMoviesResponse>(`/3/movie/${id}/recommendations`);
};
