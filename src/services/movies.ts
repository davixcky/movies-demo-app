import {httpClient} from "./httpService.ts";
import {GetGenresResponse, GetMoviesResponse} from "./moviesType.ts";


export const getTrendingMovies = async () => {
    return httpClient.get<GetMoviesResponse>('/3/trending/movie/day');
}

export const getGenres = async () => {
    return httpClient.get<GetGenresResponse>('/3/genre/movie/list');
}