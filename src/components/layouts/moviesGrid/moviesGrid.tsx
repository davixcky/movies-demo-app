import {Genre, Movie as MovieType} from "../../../services/moviesType.ts";
import styles from './moviesGrid.module.css';
import {Movie} from "../../features/movie/movie.tsx";

// .parent {
//     display: grid;
//     grid-template-columns: repeat(4, 1fr) 0fr;
//     grid-template-rows: repeat(4, 1fr) 0fr;
//     grid-column-gap: 0px;
//     grid-row-gap: 0px;
// }
//
// .div1 { grid-area: 1 / 1 / 3 / 3; }
// .div2 { grid-area: 3 / 1 / 5 / 3; }
// .div3 { grid-area: 1 / 3 / 3 / 4; }
// .div4 { grid-area: 1 / 4 / 3 / 5; }
// .div5 { grid-area: 3 / 3 / 5 / 5; }

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
                                                                                                     genres={genres}/>
            </div>)}
        </div>
    )
};

