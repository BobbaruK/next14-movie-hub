"use client";

import { MovieCard } from "@/app/components/Card/Movie";
import { RQ_TOP_RATED_MOVIES_KEY } from "@/app/constants";
import { MoviesResponse } from "@/app/types/movies/MoviesResponse";
import moviesFetchConfig from "@/app/utils/moviesFetchConfig";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  page: number;
  with_original_language: string;
  sort_by: string;
}

const TopRatedMoviesGrid = ({
  page,
  with_original_language,
  sort_by,
}: Props) => {
  const moviesConfig = moviesFetchConfig(page, with_original_language, sort_by);

  const { data, error, isLoading } = useQuery<MoviesResponse>({
    queryKey: [RQ_TOP_RATED_MOVIES_KEY, moviesConfig.params],
    placeholderData: keepPreviousData,
  });

  const router = useRouter();

  if (error)
    throw new Error("Something went wrong while fetching 'Top Rated Movies'");

  if (isLoading)
    return <div className="alert alert-info">Loading movies...</div>;

  return (
    <>
      <div className="flex gap-4 items-center justify-between mb-4">
        <button
          className="btn btn-primary"
          disabled={moviesConfig.params.page <= 1}
          onClick={() =>
            router.push(
              `/movie/top-rated?page=${moviesConfig.params.page - 1}${
                with_original_language
                  ? "&with_original_language=" + with_original_language
                  : ""
              }${sort_by ? "&sort_by=" + sort_by : ""}`
            )
          }>
          Prev
        </button>
        {data?.page} of {data?.total_pages} / {data?.total_results} results
        <button
          className="btn btn-primary"
          onClick={() => {
            router.push(
              `/movie/top-rated?page=${Number(moviesConfig.params.page) + 1}${
                with_original_language
                  ? "&with_original_language=" + with_original_language
                  : ""
              }${sort_by ? "&sort_by=" + sort_by : ""}`
            );
          }}>
          Next
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default TopRatedMoviesGrid;
