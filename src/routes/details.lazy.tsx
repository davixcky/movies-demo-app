import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/details')({
  component: DetailsLazy,
})

function DetailsLazy() {
  return <div className="p-2">Hello from About!</div>
}