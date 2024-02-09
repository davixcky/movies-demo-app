import {queryOptions, useSuspenseQuery} from "@tanstack/react-query";
import {KEY_LIST_GENRES, KEY_TRENDING_MOVIES} from "../../services/const.ts";
import {getGenres, getTrendingMovies} from "../../services/movies.ts";
import {MainLayout} from "../../components/layouts/mainLayout.tsx";
import {MoviesGrid} from "../../components/layouts/moviesGrid/moviesGrid.tsx";
import styles from './home.module.css';
import {Movie} from "../../components/features/movie/movie.tsx";


const trendingMoviesQueryOptions = queryOptions({
    queryKey: KEY_TRENDING_MOVIES,
    queryFn: getTrendingMovies,
});

const genresListQueryOptions = queryOptions({
    queryKey: KEY_LIST_GENRES,
    queryFn: getGenres,
});

export const HomePage = () => {
    const trendingMovies = useSuspenseQuery(trendingMoviesQueryOptions);
    const genresResponse = useSuspenseQuery(genresListQueryOptions);

    const genres = genresResponse.data.data.genres;
    const movies = trendingMovies.data.data.results.slice(0, 5);
    const otherMovies = trendingMovies.data.data.results.slice(5, 10);

    return (
        <MainLayout>

            <MoviesGrid movies={movies} genres={genres}/>

            <p className={styles.more_movies_title}>More like this</p>

            <div className={styles.more_movies_container}>
                {otherMovies.map((movie) => <div><Movie movie={movie} genres={genres} /></div>)}
            </div>

        </MainLayout>
    );
};