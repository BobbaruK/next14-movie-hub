import {
  RQ_UPCOMING_MOVIES_ENDPOINT,
  RQ_UPCOMING_MOVIES_KEY,
} from "@/app/constants";
import APIClient from "@/app/services/tmdbApiClient";
import { MoviesResponse } from "@/app/types/movies/MoviesResponse";
import moviesFetchConfig from "@/app/utils/moviesFetchConfig";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import MoviesGridSection from "../../../MoviesGridSection";
import { QueryParams } from "@/app/types/QueryParams";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upcoming Movies",
  description: "This is the upcoming movie page",
};

interface Props {
  searchParams: QueryParams;
}

const UpcomingMoviesPage = async ({
  searchParams: { page, with_original_language, sort_by },
}: Props) => {
  const pageNumber = parseInt(page);

  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_original_language,
    sort_by
  );

  const apiClient = new APIClient<MoviesResponse>(RQ_UPCOMING_MOVIES_ENDPOINT);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_UPCOMING_MOVIES_KEY, moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MoviesGridSection
          page={pageNumber}
          sort_by={sort_by}
          with_original_language={with_original_language}
          queryKey={RQ_UPCOMING_MOVIES_KEY}
        />
      </HydrationBoundary>
    </>
  );
};

export default UpcomingMoviesPage;