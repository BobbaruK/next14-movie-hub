import { MoviesGridSection } from "@/app/components/client/MoviesGridSection";
import {
  RQ_POPULAR_TVSHOWS_ENDPOINT,
  RQ_POPULAR_TVSHOWS_KEY,
} from "@/app/constants";
import APIClient from "@/app/services/tmdbApiClient";
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
  title: "Popular TV Shows",
  description: "This is the popular tv shows page",
};

interface Props {
  searchParams: QueryParams;
}

const PopularTVShowsPage = async ({
  searchParams: { page, with_original_language, sort_by },
}: Props) => {
  const pageNumber = parseInt(page);

  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_original_language,
    sort_by
  );

  const apiClient = new APIClient<TVShowsResponse>(RQ_POPULAR_TVSHOWS_ENDPOINT);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_POPULAR_TVSHOWS_KEY, moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MoviesGridSection
          page={pageNumber}
          sort_by={sort_by}
          with_original_language={with_original_language}
          queryKey={RQ_POPULAR_TVSHOWS_KEY}
        />
      </HydrationBoundary>
    </>
  );
};

export default PopularTVShowsPage;
