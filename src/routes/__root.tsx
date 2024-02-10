import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Error } from '../components/features/error/error.tsx';

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
  notFoundComponent: () => <Error />,
});
