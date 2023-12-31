import { TVShowResponse } from "@/app/types/movies/tv/TVShowResponse";
import movieMetadataTitle from "@/app/utils/movieMetadataTitle";
import { Metadata } from "next";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    image_language: string | undefined;
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
    title: movieMetadataTitle(
      movie.name,
      movie.first_air_date,
      "Episode Groups"
    ),
    description: movie.tagline,
  };
}

const TVShowEpisodeGroupsPage = () => {
  return <h1>TVShowEpisodeGroupsPage</h1>;
};

export default TVShowEpisodeGroupsPage;
