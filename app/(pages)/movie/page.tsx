import { DISCOVER_MOVIES_ENDPOINT } from "@/app/constants";
import APIClient from "@/app/services/tmdbApiClient";
import { MoviesResponse } from "@/app/types/movies/MoviesResponse";
import moviesFetchConfig from "@/app/utils/moviesFetchConfig";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MoviesGrid from "./MoviesGrid";

interface Props {
  searchParams: {
    page: string;
    with_original_language: string;
    sort_by: string;
  };
}

const PopularMoviePage = async ({
  searchParams: { page, with_original_language, sort_by },
}: Props) => {
  const queryClient = new QueryClient();

  const pageNumber = parseInt(page);

  const moviesConfig = moviesFetchConfig(
    pageNumber,
    with_original_language,
    sort_by
  );

  const apiClient = new APIClient<MoviesResponse>(DISCOVER_MOVIES_ENDPOINT);

  await queryClient.prefetchQuery({
    queryKey: ["movies", moviesConfig.params],
    queryFn: () => apiClient.getAll(moviesConfig),
  });

  return (
    <>
      <div className="appContaier">
        <h1>Popular movies</h1>
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
            <MoviesGrid
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

export default PopularMoviePage;
