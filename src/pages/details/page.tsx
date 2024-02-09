import {useSuspenseQuery} from "@tanstack/react-query";
import {queryOptions} from "@tanstack/react-query";
import {
    KEY_GET_MOVIE_BY_ID,
} from "../../services/const.ts";
import {getMovieById} from "../../services/movies.ts";
import {useParams} from "@tanstack/react-router";
import styles from './details.module.css';

const movieDetailsQueryOptions = (movieID: string) => queryOptions({
    queryKey: KEY_GET_MOVIE_BY_ID(movieID),
    queryFn: () => getMovieById(movieID),
});
// const movieCastQueryOptions = (movieID: string) => queryOptions({
//     queryKey: KEY_GET_CAST_BY_MOVIE_ID(movieID),
//     queryFn: () => getCastByMovieId(movieID),
// });
// const movieRecommendationsQueryOptions = (movieID: string) => queryOptions({
//     queryKey: KEY_GET_RECOMMENDATION_BY_MOVIE_ID(movieID),
//     queryFn: () => getRecommendationByMovieId(movieID),
// });

export const DetailsPage = () => {
    const params = useParams({strict: false})

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const movieID = params.movieID

    const movieDetail = useSuspenseQuery(movieDetailsQueryOptions(movieID));
    // const cast = useSuspenseQuery(movieCastQueryOptions(movieID));
    // const recommendations = useSuspenseQuery(movieRecommendationsQueryOptions(movieID));

    const getGenres = () => {
        const genres = movieDetail.data.data.genres;
        return <div>
            {genres.map((genre) => <span
                className={styles.movie_genre}>{genre.name}</span>)}
        </div>
    }


    return (
        <div className={styles.container}>

            <div className={styles.details}>
                <p className={styles.movie_title}>{movieDetail.data.data.title}</p>
                <p className={styles.movie_duration}>{movieDetail.data.data.release_date.slice(0, 4)} - 1h 45m</p>
                {
                    getGenres()
                }
            </div>
            <div className={styles.background_image_container}>
                <img src={`https://image.tmdb.org/t/p/original/${movieDetail.data.data.backdrop_path}`}
                     alt={movieDetail.data.data.title}/>

            </div>


        </div>
    );
};

