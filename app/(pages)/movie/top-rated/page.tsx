import {
  TOP_RATED_MOVIES_ENDPOINT,
  TOP_RATED_MOVIES_KEY,
} from "@/app/constants";
import APIClient from "@/app/services/tmdbApiClient";
import { MoviesResponse } from "@/app/types/movies/MoviesResponse";
import moviesFetchConfig from "@/app/utils/moviesFetchConfig";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import TopRatedMoviesGrid from "./TopRatedMoviesGrid";

interface Props {
  searchParams: {
    page: string;
    with_original_language: string;
    sort_by: string;
  };
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

  const apiClient = new APIClient<MoviesResponse>(TOP_RATED_MOVIES_ENDPOINT);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [TOP_RATED_MOVIES_KEY, moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  return (
    <>
      <div className="appContaier">
        <h1>Top Rated Movies</h1>
      </div>
      <div className="appContaier flex flex-col lg:flex-row gap-8">
        <div className="lg:basis-1/4">
          <h2>Sorting</h2>
          <h2>Filtering</h2>
          <h3>Genre(s)</h3>
          <h3>Language</h3>
        </div>
        <div className="lg:basis-3/4">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <TopRatedMoviesGrid
              page={pageNumber}
              sort_by={sort_by}
              with_original_language={with_original_language}
            />
          </HydrationBoundary>
        </div>
      </div>
    </>
  );
};

export default TopRatedMoviesPage;
