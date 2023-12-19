import {
  RQ_MOVIE_ENDPOINT,
  RQ_MOVIE_KEY
} from "@/app/constants";
import MyAPIClient from "@/app/services/myApiClient";
import { MovieResponse } from "@/app/types/movies/movie/MovieResponse";
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

  const queryClient = new QueryClient();

  const apiClientMovie = new MyAPIClient<MovieResponse>(RQ_MOVIE_ENDPOINT(id));
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_KEY, actualId],
    queryFn: () => apiClientMovie.getAll(),
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
