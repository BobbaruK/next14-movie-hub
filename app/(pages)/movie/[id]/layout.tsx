import {
  RQ_MOVIE_IMAGES_ENDPOINT,
  RQ_MOVIE_IMAGES_KEY,
  RQ_MOVIE_ENDPOINT,
  RQ_MOVIE_KEY,
} from "@/app/constants";
import APIClient from "@/app/services/tmdbApiClient";
import { ImagesResponse } from "@/app/types/movies/ImagesResponse";
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

  const queryClient = new QueryClient();

  const apiClientMovie = new APIClient<MovieResponse>(RQ_MOVIE_ENDPOINT(id));
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_KEY, actualId],
    queryFn: () => apiClientMovie.getAll(),
  });

  const apiClientImages = new APIClient<ImagesResponse>(
    RQ_MOVIE_IMAGES_ENDPOINT(id)
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_IMAGES_KEY, actualId],
    queryFn: () => apiClientImages.getAll(),
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
