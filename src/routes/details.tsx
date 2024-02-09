import {createFileRoute} from '@tanstack/react-router';
import {QueryClient, queryOptions, useSuspenseQuery} from "@tanstack/react-query";
import {KEY_LIST_GENRES, KEY_TRENDING_MOVIES} from "../services/const.ts";
import {getGenres, getTrendingMovies} from "../services/movies.ts";
import {Suspense} from "react";

const trendingMoviesQueryOptions = queryOptions({
    queryKey: KEY_TRENDING_MOVIES,
    queryFn: getTrendingMovies,
});

const genresListQueryOptions = queryOptions({
    queryKey: KEY_LIST_GENRES,
    queryFn: getGenres,
});

export const Details = () => {
    const trendingMovies = useSuspenseQuery(trendingMoviesQueryOptions)

    return (
        <Suspense fallback={<h1>loading</h1>}>
            <div className="p-2">
                <h1>{JSON.stringify(trendingMovies.data.data.results)}</h1>
            </div>
        </Suspense>
    );
};

const queryClient = new QueryClient();

export const Route = createFileRoute('/details')({
    component: () => <Suspense fallback={<h1>loading</h1>} ><Details /></Suspense>,
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

