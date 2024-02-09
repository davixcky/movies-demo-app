

export const KEY_TRENDING_MOVIES = ['movies', 'trending'];
export const KEY_LIST_GENRES = ['genres'];
export const KEY_GET_MOVIE_BY_ID = (id: string) => ['movies', 'movie', id];
export const KEY_GET_CAST_BY_MOVIE_ID = (id: string) => ['movies', 'movie', 'cast', id];
export const KEY_GET_RECOMMENDATION_BY_MOVIE_ID = (id: string) => ['movies', 'movie', 'recommendation', id];
