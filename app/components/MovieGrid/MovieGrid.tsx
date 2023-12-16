import { MoviesResponse } from "@/app/types/movies/movie/MoviesResponse";
import { MovieCard } from "../Card/Movie";
import { TVShowsResponse } from "@/app/types/movies/tv/TVShowsResponse";

interface Props {
  movies: MoviesResponse | TVShowsResponse | undefined;
}

const MovieGrid = ({ movies }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
      {movies?.results?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
