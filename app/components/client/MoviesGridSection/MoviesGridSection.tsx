"use client";
import MovieGrid from "@/app/components/MovieGrid/MovieGrid";
import MoviePagination from "@/app/components/MoviePagination/MoviePagination";
import ImagesShowcaseProvider from "@/app/providers/ImageContext/ImagesShowcaseProvider";
import { MoviesResponse } from "@/app/types/movies/movie/MoviesResponse";
import { TVShowsResponse } from "@/app/types/movies/tv/TVShowsResponse";
import moviesFetchConfig from "@/app/utils/moviesFetchConfig";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface Props {
  page: number;
  with_original_language: string;
  sort_by: string;
  queryKey: string;
}

const MoviesGridSection = ({
  page,
  with_original_language,
  sort_by,
  queryKey,
}: Props) => {
  const tvShowConfig = moviesFetchConfig(page, with_original_language, sort_by);

  // const apiClient = new APIClient<MoviesResponse>(DISCOVER_MOVIES_ENDPOINT);

  const { data, error, isLoading } = useQuery<MoviesResponse | TVShowsResponse>(
    {
      queryKey: [queryKey, tvShowConfig.params],
      // queryFn: () => apiClient.getAll(moviesConfig),
      placeholderData: keepPreviousData,
    }
  );

  if (error) throw new Error("Something went wrong while fetching Data");

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
      <ImagesShowcaseProvider className={"sm:h-72 object-cover"}>
        <MovieGrid movies={data} />
      </ImagesShowcaseProvider>
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

export default MoviesGridSection;
