import {Genre, Movie as MovieType} from "../../../services/moviesType.ts";
import styles from './moviesGrid.module.css';
import {Movie} from "../../features/movie/movie.tsx";

type MoviesGridProps = {
    movies: MovieType[];
    genres: Genre[];
}

export const MoviesGrid = ({movies, genres}: MoviesGridProps) => {
    const slicedMovies = movies.slice(0, 5);

    if (slicedMovies.length === 0) {
        return <h1>No movies</h1>;
    }

    return (
        <div className={styles.movies}>
            {slicedMovies.map((movie, index) => <div className={`${styles[`movie_${index + 1}`]} ${styles.movie}`}><Movie movie={movie}
                                                                                                     genres={genres} maxGenreDisplay={1}/>
            </div>)}
        </div>
    );
};

