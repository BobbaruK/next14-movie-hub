import useMovieMetadataTitle from "@/app/hooks/useMovieMetadataTitle";
import { MovieResponse } from "@/app/types/movies/MovieResponse";
import { Metadata } from "next";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  // parent: ResolvingMetadata
  params: { id },
}: Props): Promise<Metadata> {
  const movie: MovieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return {
    title: useMovieMetadataTitle(
      movie.title,
      movie.release_date,
      "Alternative Titles"
    ),
    description: movie.tagline,
  };
}

const MovieTitlesPage = () => {
  return <h1>MovieTitlesPage</h1>;
};

export default MovieTitlesPage;
