import { MoviesGridSection } from "@/app/components/client/MoviesGridSection";
import {
  RQ_AIRING_TODAY_TVSHOWS_ENDPOINT,
  RQ_AIRING_TODAY_TVSHOWS_KEY,
} from "@/app/constants";
import MyAPIClient from "@/app/services/myApiClient";
import { QueryParams } from "@/app/types/QueryParams";
import { TVShowsResponse } from "@/app/types/movies/tv/TVShowsResponse";
import moviesFetchConfig from "@/app/utils/moviesFetchConfig";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airing Today TV Shows",
};

interface Props {
  searchParams: QueryParams;
}

const TVShowsAiringTodayPage = async ({
  searchParams: { page, with_original_language, sort_by },
}: Props) => {
  const pageNumber = parseInt(page);

  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_original_language,
    sort_by
  );

  const apiClient = new MyAPIClient<TVShowsResponse>(
    RQ_AIRING_TODAY_TVSHOWS_ENDPOINT
  );

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_AIRING_TODAY_TVSHOWS_KEY, moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MoviesGridSection
          page={pageNumber}
          sort_by={sort_by}
          with_original_language={with_original_language}
          queryKey={RQ_AIRING_TODAY_TVSHOWS_KEY}
        />
      </HydrationBoundary>
    </>
  );
};

export default TVShowsAiringTodayPage;
