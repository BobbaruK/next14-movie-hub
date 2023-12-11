"use client";

import MovieGrid from "@/app/components/MovieGrid/MovieGrid";
import MoviePagination from "@/app/components/MoviePagination/MoviePagination";
import { RQ_NOW_PLAYING_MOVIES_KEY } from "@/app/constants";
import { MoviesResponse } from "@/app/types/movies/MoviesResponse";
import moviesFetchConfig from "@/app/utils/moviesFetchConfig";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface Props {
  page: number;
  with_original_language: string;
  sort_by: string;
}

const NowPlayingMoviesGrid = ({
  page,
  with_original_language,
  sort_by,
}: Props) => {
  const moviesConfig = moviesFetchConfig(page, with_original_language, sort_by);

  const { data, error, isLoading } = useQuery<MoviesResponse>({
    queryKey: [RQ_NOW_PLAYING_MOVIES_KEY, moviesConfig.params],
    placeholderData: keepPreviousData,
  });

  if (error)
    throw new Error("Something went wrong while fetching 'Now Playing Movies'");

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

export default NowPlayingMoviesGrid;
