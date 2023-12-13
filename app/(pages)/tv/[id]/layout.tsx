import {
  RQ_TVSHOWS_IMAGES_ENDPOINT,
  RQ_TVSHOWS_IMAGES_KEY,
  RQ_TVSHOW_ENDPOINT,
  RQ_TVSHOW_KEY,
} from "@/app/constants";
import APIClient from "@/app/services/tmdbApiClient";
import { ImagesResponse } from "@/app/types/movies/ImagesResponse";
import { TVShowResponse } from "@/app/types/movies/TVShowResponse";
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

  const apiClient = new APIClient<TVShowResponse>(RQ_TVSHOW_ENDPOINT(id));
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_KEY, actualId],
    queryFn: () => apiClient.getAll(),
  });

  const apiClientImages = new APIClient<ImagesResponse>(
    RQ_TVSHOWS_IMAGES_ENDPOINT(id)
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOWS_IMAGES_KEY, actualId],
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
