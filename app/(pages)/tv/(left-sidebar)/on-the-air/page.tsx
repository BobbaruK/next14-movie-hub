import MoviesGridSection from "@/app/(pages)/MoviesGridSection";
import {
  RQ_ON_THE_AIR_TVSHOW_ENDPOINT,
  RQ_ON_THE_AIR_TVSHOW_KEY,
} from "@/app/constants";
import APIClient from "@/app/services/tmdbApiClient";
import { QueryParams } from "@/app/types/QueryParams";
import { TVShowsResponse } from "@/app/types/movies/TVShowsResponse";
import moviesFetchConfig from "@/app/utils/moviesFetchConfig";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "On The Air TV Shows",
  description: "This is the on the air tv shows page",
};

interface Props {
  searchParams: QueryParams;
}

const TVShowsOnTheAirPage = async ({
  searchParams: { page, with_original_language, sort_by },
}: Props) => {
  const pageNumber = parseInt(page);

  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_original_language,
    sort_by
  );

  const apiClient = new APIClient<TVShowsResponse>(
    RQ_ON_THE_AIR_TVSHOW_ENDPOINT
  );

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_ON_THE_AIR_TVSHOW_KEY, moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MoviesGridSection
          page={pageNumber}
          sort_by={sort_by}
          with_original_language={with_original_language}
          queryKey={RQ_ON_THE_AIR_TVSHOW_KEY}
        />
      </HydrationBoundary>
    </>
  );
};

export default TVShowsOnTheAirPage;
