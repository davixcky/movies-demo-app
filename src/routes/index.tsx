import {createFileRoute} from '@tanstack/react-router';
import {QueryClient, queryOptions} from "@tanstack/react-query";
import {KEY_LIST_GENRES, KEY_TRENDING_MOVIES} from "../services/const.ts";
import {getGenres, getTrendingMovies} from "../services/movies.ts";
import {Suspense} from "react";
import {HomePage} from "../pages/home/page.tsx";

const queryClient = new QueryClient();

const trendingMoviesQueryOptions = queryOptions({
    queryKey: KEY_TRENDING_MOVIES,
    queryFn: getTrendingMovies,
});

const genresListQueryOptions = queryOptions({
    queryKey: KEY_LIST_GENRES,
    queryFn: getGenres,
});

export const Route = createFileRoute('/')({
    component: () => <Suspense fallback={<h1>loading</h1>}><HomePage/></Suspense>,
    loader: async () => {
        const trendingMovies = queryClient.ensureQueryData(trendingMoviesQueryOptions)
        const genresList = queryClient.ensureQueryData(genresListQueryOptions);
        const [trendingMoviesData, genresListData] = await Promise.all([trendingMovies, genresList])

        return {trendingMoviesData, genresListData};
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

