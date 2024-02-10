import { createFileRoute } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { HomePage } from '../pages/home/page.tsx';
import { Loading } from '../components/primitives/loading.tsx';
import {
  genresListQueryOptions,
  trendingMoviesQueryOptions,
} from '../services/query/options.ts';
import { Error } from '../components/features/error/error.tsx';

const queryClient = new QueryClient();

export const Route = createFileRoute('/')({
  component: () => (
    <Suspense fallback={<Loading />}>
      <HomePage />
    </Suspense>
  ),
  loader: async () => {
    const trendingMovies = queryClient.ensureQueryData(
      trendingMoviesQueryOptions,
    );
    const genresList = queryClient.ensureQueryData(genresListQueryOptions);
    const [trendingMoviesData, genresListData] = await Promise.all([
      trendingMovies,
      genresList,
    ]);

    return { trendingMoviesData, genresListData };
  },
  errorComponent: () => {
    return <Error message="Unexpected error" />;
  },
});
