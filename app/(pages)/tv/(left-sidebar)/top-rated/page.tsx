import MoviesGridSection from "@/app/(pages)/MoviesGridSection";
import {
  RQ_TOP_RATED_TVSHOWS_ENDPOINT,
  RQ_TOP_RATED_TVSHOWS_KEY,
} from "@/app/constants";
import APIClient from "@/app/services/tmdbApiClient";
import { TVShowsResponse } from "@/app/types/tv/TVShowsResponse";
import moviesFetchConfig from "@/app/utils/moviesFetchConfig";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

interface Props {
  searchParams: {
    page: string;
    with_original_language: string;
    sort_by: string;
  };
}

const TopRatedTVShowsPage = async ({
  searchParams: { page, with_original_language, sort_by },
}: Props) => {
  const pageNumber = parseInt(page);

  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_original_language,
    sort_by
  );

  const apiClient = new APIClient<TVShowsResponse>(
    RQ_TOP_RATED_TVSHOWS_ENDPOINT
  );

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_TOP_RATED_TVSHOWS_KEY, moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MoviesGridSection
          page={pageNumber}
          sort_by={sort_by}
          with_original_language={with_original_language}
          queryKey={RQ_TOP_RATED_TVSHOWS_KEY}
        />
      </HydrationBoundary>
    </>
  );
};

export default TopRatedTVShowsPage;
