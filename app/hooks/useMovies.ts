import { TMDB_AUTHORIZATION } from "../constants";
import { MoviesResponse } from "../types/movie";

const useMovies = async () => {
  const res = await fetch("https://api.themoviedb.org/3/discover/movie", {
    headers: {
      accept: "application/json",
      Authorization: TMDB_AUTHORIZATION,
    },
		
    // cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

	const movies: MoviesResponse = await res.json();

	return movies
};

export default useMovies;
