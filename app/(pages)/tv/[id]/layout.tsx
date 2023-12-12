import { RQ_TVSHOW_ENDPOINT, RQ_TVSHOW_KEY } from "@/app/constants";
import APIClient from "@/app/services/tmdbApiClient";
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

  const apiClient = new APIClient<TVShowResponse>(
    RQ_TVSHOW_ENDPOINT + actualId
  );

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_KEY, actualId],
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
