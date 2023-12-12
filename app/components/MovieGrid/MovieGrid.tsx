import { MoviesResponse } from "@/app/types/movies/MoviesResponse";
import { MovieCard } from "../Card/Movie";
import { TVShowsResponse } from "@/app/types/movies/TVShowsResponse";

interface Props {
  movies: MoviesResponse | TVShowsResponse | undefined;
}

const MovieGrid = ({ movies }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
      {movies?.results?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
