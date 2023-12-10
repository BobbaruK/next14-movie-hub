"use client";

import { TVShowsCard } from "@/app/components/Card/TVShows";
import { POPULAR_TVSHOWS_KEY } from "@/app/constants";
import { TVShowsResponse } from "@/app/types/tv/TVShowsResponse";
import moviesFetchConfig from "@/app/utils/moviesFetchConfig";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
    queryKey: [POPULAR_TVSHOWS_KEY, tvShowConfig.params],
    // queryFn: () => apiClient.getAll(moviesConfig),
    placeholderData: keepPreviousData,
  });

  const router = useRouter();

  if (error) throw new Error("Something went wrong while fetching 'Popular TV Shows'");

  if (isLoading)
    return <div className="alert alert-info">Loading movies...</div>;

  return (
    <>
      <div className="flex gap-4 items-center justify-between mb-4">
        <button
          className="btn btn-primary"
          disabled={tvShowConfig.params.page <= 1}
          onClick={() =>
            router.push(
              `/tv?page=${tvShowConfig.params.page - 1}
              ${
                with_original_language
                  ? "&with_original_language=" + with_original_language
                  : ""
              }
              ${sort_by ? "&sort_by=" + sort_by : ""}`
            )
          }>
          Prev
        </button>
        {data?.page} of {data?.total_pages} / {data?.total_results} results
        <button
          className="btn btn-primary"
          onClick={() => {
            router.push(
              `/tv?page=${Number(tvShowConfig.params.page) + 1}${
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
        {data?.results?.map((tvShow) => (
          <TVShowsCard key={tvShow.id} tvShow={tvShow} />
        ))}
      </div>
    </>
  );
};

export default PopularTVShowsGrid;
