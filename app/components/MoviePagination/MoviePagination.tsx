import { MoviesResponse } from "@/app/types/movies/MoviesResponse";
import { TVShowsResponse } from "@/app/types/tv/TVShowsResponse";
import moviesFetchConfig from "@/app/utils/moviesFetchConfig";
import { useRouter } from "next/navigation";

interface Props {
  page: number;
  with_original_language: string;
  sort_by: string;
  movie: MoviesResponse | TVShowsResponse | undefined;
}

const MoviePagination = ({
  page,
  with_original_language,
  sort_by,
  movie,
}: Props) => {
  const moviesConfig = moviesFetchConfig(page, with_original_language, sort_by);

  const router = useRouter();

  return (
    <div className="flex gap-4 items-center justify-between">
      <button
        className="btn btn-primary"
        disabled={moviesConfig.params.page <= 1}
        onClick={() =>
          router.push(
            `?page=${moviesConfig.params.page - 1}${
              with_original_language
                ? "&with_original_language=" + with_original_language
                : ""
            }${sort_by ? "&sort_by=" + sort_by : ""}`
          )
        }>
        Prev
      </button>
      {/* <span className="loading loading-infinity loading-md"></span> */}
      {movie?.page} of {movie?.total_pages} / {movie?.total_results} results
      <button
        className="btn btn-primary"
        onClick={() => {
          router.push(
            `?page=${Number(moviesConfig.params.page) + 1}${
              with_original_language
                ? "&with_original_language=" + with_original_language
                : ""
            }${sort_by ? "&sort_by=" + sort_by : ""}`
          );
        }}>
        Next
      </button>
    </div>
  );
};

export default MoviePagination;
