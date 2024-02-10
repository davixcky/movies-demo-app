import { createFileRoute } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { DetailsPage } from '../pages/details/page.tsx';
import {
  movieCastQueryOptions,
  movieDetailsQueryOptions,
  movieRecommendationsQueryOptions,
} from '../services/query/options.ts';

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
  onError: error => {
    console.log(error.message);
    return <h1>{error.message}</h1>;
  },
  errorComponent: error => {
    console.log(error);
    return <h1>error here</h1>;
  },
});

function PageWrapper() {
  const { movieID } = Route.useParams();

  return (
    <Suspense fallback={<h1>loading</h1>}>
      <DetailsPage movieID={movieID} />
    </Suspense>
  );
}
