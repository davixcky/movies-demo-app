import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import React from "react";

// Create a client
const queryClient = new QueryClient()

type ReactQueryProviderProps = {
    children: React.ReactNode
}
export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>
            { children }
        </QueryClientProvider>
    )
}
