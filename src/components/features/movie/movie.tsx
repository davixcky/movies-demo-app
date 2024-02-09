import {Genre, Movie as MovieType} from "../../../services/moviesType.ts";
import styles from './movie.module.css';

type MovieProps = {
    movie: MovieType;
    genres: Genre[];
}

const MovieGenres = ({ movie, genres }: MovieProps) => {
    const genreIds = movie.genre_ids;

    const filteredGenres = genres.filter((genre) => genreIds.includes(genre.id)).slice(0, 1);

    return (
        <div className={styles.movie_genre_container}>
            {filteredGenres.map((genre) => <span key={genre.id} className={styles.movie_genre}>{genre.name}</span>)}
        </div>
    );
}

export const Movie = ({ movie, genres }: MovieProps) => {
    return (
        <div key={movie.id} className={styles.container}>
            <p className={styles.description}>{movie.overview}</p>
            <MovieGenres movie={movie} genres={genres} />
            <h1 className={styles.title}>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} className={styles.backdrop_image} />
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} className={styles.poster_image} />
        </div>
    );
};
