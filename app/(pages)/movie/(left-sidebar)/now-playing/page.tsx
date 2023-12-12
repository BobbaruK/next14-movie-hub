import {
  RQ_NOW_PLAYING_MOVIES_ENDPOINT,
  RQ_NOW_PLAYING_MOVIES_KEY,
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

interface Props {
  searchParams: QueryParams;
}

const NowPlayingMoviesPage = async ({
  searchParams: { page, with_original_language, sort_by },
}: Props) => {
  const pageNumber = parseInt(page);
  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_original_language,
    sort_by
  );

  const apiClient = new APIClient<MoviesResponse>(
    RQ_NOW_PLAYING_MOVIES_ENDPOINT
  );

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_NOW_PLAYING_MOVIES_KEY, moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MoviesGridSection
          page={pageNumber}
          sort_by={sort_by}
          with_original_language={with_original_language}
          queryKey={RQ_NOW_PLAYING_MOVIES_KEY}
        />
      </HydrationBoundary>
    </>
  );
};

export default NowPlayingMoviesPage;
