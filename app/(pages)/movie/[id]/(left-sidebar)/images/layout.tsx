import {
  RQ_MOVIE_IMAGES_ENDPOINT,
  RQ_MOVIE_IMAGES_KEY
} from "@/app/constants";
import APIClient from "@/app/services/tmdbApiClient";
import { TMDB_ImagesResponse } from "@/app/types/movies/ImagesResponse";
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

  const apiClientImages = new APIClient<TMDB_ImagesResponse>(
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
