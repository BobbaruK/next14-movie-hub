"use client";

import { TVShowsCard } from "@/app/components/Card/TVShow";
import MoviePagination from "@/app/components/MoviePagination/MoviePagination";
import { RQ_ON_THE_AIR_TVSHOW_KEY } from "@/app/constants";
import { TVShowsResponse } from "@/app/types/tv/TVShowsResponse";
import moviesFetchConfig from "@/app/utils/moviesFetchConfig";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface Props {
  page: number;
  with_original_language: string;
  sort_by: string;
}

const OnTheAirTVShowsGrid = ({
  page,
  with_original_language,
  sort_by,
}: Props) => {
  const tvShowConfig = moviesFetchConfig(page, with_original_language, sort_by);

  // const apiClient = new APIClient<MoviesResponse>(DISCOVER_MOVIES_ENDPOINT);

  const { data, error, isLoading } = useQuery<TVShowsResponse>({
    queryKey: [RQ_ON_THE_AIR_TVSHOW_KEY, tvShowConfig.params],
    // queryFn: () => apiClient.getAll(moviesConfig),
    placeholderData: keepPreviousData,
  });

  if (error)
    throw new Error(
      "Something went wrong while fetching 'Airing today TV Shows'"
    );

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {data?.results?.map((tvShow) => (
          <TVShowsCard key={tvShow.id} tvShow={tvShow} />
        ))}
      </div>
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

export default OnTheAirTVShowsGrid;
