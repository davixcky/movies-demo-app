import {Genre, Movie as MovieType} from "../../../services/moviesType.ts";
import {Movie} from "../movie/movie.tsx";
import styles from './movieList.module.css';

type MovieListProps = {
    movies: MovieType[];
    genres?: Genre[];
}

export const MovieList = ({ movies, genres }: MovieListProps) => {
    return (
        <div className={styles.movies}>
            {movies.map((m) => (
                <div key={m.id} className={styles.movie}>
                    <Movie movie={m} genres={genres} maxGenreDisplay={1} />
                </div>
            ))}
        </div>
    )
}