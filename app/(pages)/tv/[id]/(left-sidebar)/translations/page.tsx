import { MainMovieTranslationsFiltering } from "@/app/components/client/MainMovieTranslationsFiltering";
import { ShowcaseTranslationsTVShow } from "@/app/components/client/ShowcaseTranslations/tv";
import { MainMovieLeftSidebarTemplate } from "@/app/components/server/MainMovieLeftSidebarTemplate";
import { RQ_TV_SHOWS_TRANSLATIONS_KEY } from "@/app/constants";
import { TVShowResponse } from "@/app/types/movies/tv/TVShowResponse";
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
    title: movieMetadataTitle(movie.name, movie.first_air_date, "Translations"),
    description: movie.tagline,
  };
}

const TVShowTranslationsPage = ({ params: { id } }: Props) => {
  const actualId = parseInt(id);
  return (
    <>
      <MainMovieLeftSidebarTemplate
        title="Translations"
        sidebar={
          <MainMovieTranslationsFiltering
            id={actualId}
            queryKey={RQ_TV_SHOWS_TRANSLATIONS_KEY}
          />
        }
        content={
          <ShowcaseTranslationsTVShow
            id={actualId}
            queryKey={RQ_TV_SHOWS_TRANSLATIONS_KEY}
          />
        }
      />
    </>
  );
};

export default TVShowTranslationsPage;
