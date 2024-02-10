import { useSuspenseQuery } from '@tanstack/react-query';
import styles from './details.module.css';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/primitives/button.tsx';
import { useRouter } from '@tanstack/react-router';
import { MovieList } from '../../components/features/movieList/movieList.tsx';
import {
  movieCastQueryOptions,
  movieDetailsQueryOptions,
  movieRecommendationsQueryOptions,
} from '../../services/query/options.ts';
import ReactPlayer from 'react-player';
import { useMemo } from 'react';

type DetailsPageProps = {
  movieID: string;
};

export const DetailsPage = ({ movieID }: DetailsPageProps) => {
  const router = useRouter();
  const goBack = () => router.history.back();

  const movieDetail = useSuspenseQuery(movieDetailsQueryOptions(movieID));
  const cast = useSuspenseQuery(movieCastQueryOptions(movieID));
  const recommendations = useSuspenseQuery(
    movieRecommendationsQueryOptions(movieID),
  );

  const getGenres = () => {
    const genres = movieDetail.data.data.genres;
    return (
      <div className={styles.genres_container}>
        {genres.map(genre => (
          <span className={styles.movie_genre}>{genre.name}</span>
        ))}
      </div>
    );
  };

  const trailer = useMemo(() => {
    const videos = movieDetail.data.data.videos.results;

    const trailer = videos.find(video => video.type === 'Trailer');
    if (!trailer) return null;

    return (
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailer.key}`}
        muted
        loop
        playing
        controls={false}
        width="100%"
        height="100%"
      />
    );
  }, [movieDetail]);

  const directors = cast.data.data.crew.filter(crew => crew.job === 'Director');
  const writers = cast.data.data.crew.filter(crew => crew.job === 'Writer');
  const mainCast = cast.data.data.cast.slice(0, 5);

  return (
    <div className={styles.container}>
      <div className={styles.details_container}>
        <Button leftIcon={<ArrowLeft />} onClick={goBack}>
          Go back
        </Button>
        <div className={styles.details}>
          <p className={styles.movie_title}>{movieDetail.data.data.title}</p>
          <p className={styles.movie_duration}>
            {movieDetail.data.data.release_date.slice(0, 4)} - 1h 45m
          </p>
          {getGenres()}
        </div>
        <div className={styles.background_image_container}>
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetail.data.data.backdrop_path}`}
            alt={movieDetail.data.data.title}
          />

          {trailer && trailer}
        </div>
      </div>
      <div className={styles.extra_details_container}>
        <p id="overview">{movieDetail.data.data.overview}</p>

        <div className={styles.extra_details}>
          <p>
            Director: <span>{directors.map(d => d.name).join(', ')}</span>
          </p>
          <p>
            Writer: <span>{writers.map(d => d.name).join(', ')}</span>
          </p>
          <p>
            Cast: <span>{mainCast.map(c => c.name).join(', ')}</span>
          </p>
        </div>

        {recommendations.data.data.results.length > 0 && (
          <div className={styles.recommendations}>
            <p className={styles.recommendations__title}>Recommendations</p>

            <MovieList movies={recommendations.data.data.results} />
          </div>
        )}
      </div>
    </div>
  );
};
