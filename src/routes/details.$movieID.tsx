import { createFileRoute } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { DetailsPage } from '../pages/details/page.tsx';
import {
  movieCastQueryOptions,
  movieDetailsQueryOptions,
  movieRecommendationsQueryOptions,
} from '../services/query/options.ts';
import {Error} from "../components/features/error/error.tsx";
import {Loading} from "../components/primitives/loading.tsx";

const queryClient = new QueryClient();

export const Route = createFileRoute('/details/$movieID')({
  component: PageWrapper,
  loader: async ({ params }) => {
    const movieID = params.movieID;

    const movieDetails = queryClient.ensureQueryData(
      movieDetailsQueryOptions(movieID),
    );
    const credits = queryClient.ensureQueryData(movieCastQueryOptions(movieID));
    const recommendations = queryClient.ensureQueryData(
      movieRecommendationsQueryOptions(movieID),
    );
    const [movieDetailsData, creditsData, recommendationsData] =
      await Promise.all([movieDetails, credits, recommendations]);

    return { movieDetailsData, creditsData, recommendationsData };
  },
  errorComponent: error => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if ((error as unknown).error.response.status === 404) {
      return <Error message='Movie not found'/>
    }

    return <Error message='Something unexpected happened. Try again or contact support'/>
  },
});

function PageWrapper() {
  const { movieID } = Route.useParams();

  return (
    <Suspense fallback={<Loading />}>
      <DetailsPage movieID={movieID} />
    </Suspense>
  );
}
