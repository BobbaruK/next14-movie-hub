import MainMovieSection from "@/app/(pages)/MainMovieSection";
import { RQ_TVSHOW_KEY } from "@/app/constants";
import { TVShowResponse } from "@/app/types/movies/TVShowResponse";
import movieMetadataTitle from "@/app/utils/movieMetadataTitle";
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
  const movie: TVShowResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return {
    title: movieMetadataTitle(movie.name, movie.first_air_date),
    description: movie.tagline,
  };
}

const TVShowPage = ({ params: { id } }: Props) => {
  const actualId = parseInt(id);

  return (
    <>
      <h1>TVShow: {actualId}</h1>
      <MainMovieSection id={actualId} queryKey={RQ_TVSHOW_KEY} />
    </>
  );
};

export default TVShowPage;
