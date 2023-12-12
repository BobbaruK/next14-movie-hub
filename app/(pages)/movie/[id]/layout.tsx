import { RQ_MOVIE_ENDPOINT, RQ_MOVIE_KEY } from "@/app/constants";
import APIClient from "@/app/services/tmdbApiClient";
import { MovieResponse } from "@/app/types/movies/MovieResponse";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: {
    id: string;
  };
}

const MainMovieLayout = async ({ children, params: { id } }: Props) => {
  const actualId = parseInt(id);

  const apiClient = new APIClient<MovieResponse>(RQ_MOVIE_ENDPOINT + actualId);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_KEY, actualId],
    queryFn: () => apiClient.getAll(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </>
  );
};

export default MainMovieLayout;
