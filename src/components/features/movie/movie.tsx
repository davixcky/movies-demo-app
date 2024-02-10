import { Genre, Movie as MovieType } from '../../../services/moviesType.ts';
import styles from './movie.module.css';
import { useNavigate } from '@tanstack/react-router';

type MovieProps = {
  movie: MovieType;
  genres?: Genre[];
  maxGenreDisplay?: number;
};

type MovieGenreProps = {
  genre: Genre;
};

const MovieGenre = ({ genre }: MovieGenreProps) => {
  return <span className={styles.movie_genre}>{genre.name}</span>;
};

const MovieGenres = ({ movie, genres, maxGenreDisplay }: MovieProps) => {
  if (!genres && !movie.genres) return null;

  if (movie.genres && movie.genres.length > 0) {
    return (
      <div className={styles.movie_genre_container}>
        {movie.genres.slice(0, maxGenreDisplay).map(genre => (
          <MovieGenre key={genre.id} genre={genre} />
        ))}
      </div>
    );
  }

  if (!genres) return null;

  console.log(movie.genre_ids, genres, maxGenreDisplay);
  let movieGenres = movie.genre_ids;

  if (maxGenreDisplay && movieGenres.length > maxGenreDisplay) {
    movieGenres = movieGenres.slice(0, maxGenreDisplay);
  }

  const genresList = genres.filter(genre => movieGenres.includes(genre.id));

  return (
    <div className={styles.movie_genre_container}>
      {genresList.map(genre => (
        <MovieGenre key={genre.id} genre={genre} />
      ))}
    </div>
  );
};

export const Movie = ({ movie, genres, maxGenreDisplay }: MovieProps) => {
  const navigate = useNavigate();

  return (
    <div
      key={movie.id}
      className={styles.container}
      onClick={() =>
        navigate({
          to: '/details/$movieID',
          params: {
            movieID: movie.id.toString(),
          },
        })
      }
    >
      <p className={styles.description}>{movie.overview}</p>
      <MovieGenres
        movie={movie}
        genres={genres}
        maxGenreDisplay={maxGenreDisplay}
      />
      <h1 className={styles.title}>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
        className={styles.backdrop_image}
      />
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt={movie.title}
        className={styles.poster_image}
      />
    </div>
  );
};
