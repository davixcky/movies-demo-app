import {createFileRoute} from '@tanstack/react-router';
import {QueryClient, queryOptions} from "@tanstack/react-query";
import {
    KEY_GET_CAST_BY_MOVIE_ID,
    KEY_GET_MOVIE_BY_ID, KEY_GET_RECOMMENDATION_BY_MOVIE_ID,
} from "../services/const.ts";
import {
    getCastByMovieId,
    getMovieById,
    getRecommendationByMovieId,
} from "../services/movies.ts";
import {Suspense} from "react";
import {DetailsPage} from "../pages/details/page.tsx";


const movieDetailsQueryOptions = (movieID: string) => queryOptions({
    queryKey: KEY_GET_MOVIE_BY_ID(movieID),
    queryFn: () => getMovieById(movieID),
});
const movieCastQueryOptions = (movieID: string) => queryOptions({
    queryKey: KEY_GET_CAST_BY_MOVIE_ID(movieID),
    queryFn: () => getCastByMovieId(movieID),
});
const movieRecommendationsQueryOptions = (movieID: string) => queryOptions({
    queryKey: KEY_GET_RECOMMENDATION_BY_MOVIE_ID(movieID),
    queryFn: () => getRecommendationByMovieId(movieID),
});

const queryClient = new QueryClient();

export const Route = createFileRoute('/details/$movieID')({
    component: () => <Suspense fallback={<h1>loading</h1>}><DetailsPage/></Suspense>,
    loader: async ({params}) => {
        const movieID = params.movieID;

        const movieDetails = queryClient.ensureQueryData(movieDetailsQueryOptions(movieID))
        const credits = queryClient.ensureQueryData(movieCastQueryOptions(movieID))
        const recommendations = queryClient.ensureQueryData(movieRecommendationsQueryOptions(movieID))
        const [
            movieDetailsData,
            creditsData,
            recommendationsData
        ] = await Promise.all([movieDetails, credits, recommendations])

        return {movieDetailsData, creditsData, recommendationsData};

    },
    onError: (error) => {
        console.log(error.message);
        return <h1>{error.message}</h1>
    },
    errorComponent: (error) => {
        console.log(error);
        return <h1>error here</h1>
    }
});

