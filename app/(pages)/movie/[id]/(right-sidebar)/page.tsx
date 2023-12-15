import MainMovieSection from "@/app/(pages)/MainMovieSection";
import { RQ_MOVIE_KEY } from "@/app/constants";
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
  // fetch data
  const movie: MovieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: useMovieMetadataTitle(movie.title, movie.release_date),
    description: movie.tagline,
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
  };
}

const MoviePage = ({ params: { id } }: Props) => {
  const actualId = parseInt(id);

  return (
    <>
      <h1>Movie: {actualId}</h1>
      <MainMovieSection id={actualId} queryKey={RQ_MOVIE_KEY} />
    </>
  );
};

export default MoviePage;
