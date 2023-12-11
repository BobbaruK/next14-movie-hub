"use client";
import MovieGrid from "@/app/components/MovieGrid/MovieGrid";
import MoviePagination from "@/app/components/MoviePagination/MoviePagination";
import { RQ_POPULAR_TVSHOWS_KEY } from "@/app/constants";
import { TVShowsResponse } from "@/app/types/tv/TVShowsResponse";
import moviesFetchConfig from "@/app/utils/moviesFetchConfig";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface Props {
  page: number;
  with_original_language: string;
  sort_by: string;
}

const PopularTVShowsGrid = ({
  page,
  with_original_language,
  sort_by,
}: Props) => {
  const tvShowConfig = moviesFetchConfig(page, with_original_language, sort_by);

  // const apiClient = new APIClient<MoviesResponse>(DISCOVER_MOVIES_ENDPOINT);

  const { data, error, isLoading } = useQuery<TVShowsResponse>({
    queryKey: [RQ_POPULAR_TVSHOWS_KEY, tvShowConfig.params],
    // queryFn: () => apiClient.getAll(moviesConfig),
    placeholderData: keepPreviousData,
  });

  if (error)
    throw new Error("Something went wrong while fetching 'Popular TV Shows'");

  if (isLoading)
    return <div className="alert alert-info">Loading movies...</div>;

  return (
    <>
      <div className="mb-4">
        <MoviePagination
          movie={data}
          page={page}
          sort_by={sort_by}
          with_original_language={with_original_language}
        />
      </div>
      <MovieGrid movies={data} />
      <div className="mt-4">
        <MoviePagination
          movie={data}
          page={page}
          sort_by={sort_by}
          with_original_language={with_original_language}
        />
      </div>
    </>
  );
};

export default PopularTVShowsGrid;
