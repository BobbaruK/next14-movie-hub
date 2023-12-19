import { MoviesGridSection } from "@/app/components/client/MoviesGridSection";
import {
  RQ_TOP_RATED_MOVIES_ENDPOINT,
  RQ_TOP_RATED_MOVIES_KEY,
} from "@/app/constants";
import MyAPIClient from "@/app/services/myApiClient";
import { QueryParams } from "@/app/types/QueryParams";
import { MoviesResponse } from "@/app/types/movies/movie/MoviesResponse";
import moviesFetchConfig from "@/app/utils/moviesFetchConfig";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Rater Movies",
};

interface Props {
  searchParams: QueryParams;
}

const TopRatedMoviesPage = async ({
  searchParams: { page, with_original_language, sort_by },
}: Props) => {
  const pageNumber = parseInt(page);
  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_original_language,
    sort_by
  );

  const apiClient = new MyAPIClient<MoviesResponse>(RQ_TOP_RATED_MOVIES_ENDPOINT);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_TOP_RATED_MOVIES_KEY, moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MoviesGridSection
          page={pageNumber}
          sort_by={sort_by}
          with_original_language={with_original_language}
          queryKey={RQ_TOP_RATED_MOVIES_KEY}
        />
      </HydrationBoundary>
    </>
  );
};

export default TopRatedMoviesPage;
