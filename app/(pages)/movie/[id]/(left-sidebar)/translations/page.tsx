import { MainMovieTranslationsFiltering } from "@/app/components/client/MainMovieTranslationsFiltering";
import { ShowcaseTranslationsMovies } from "@/app/components/client/ShowcaseTranslations/movie";
import { MainMovieLeftSidebarTemplate } from "@/app/components/server/MainMovieLeftSidebarTemplate";
import { RQ_MOVIE_TRANSLATIONS_KEY } from "@/app/constants";
import { MovieResponse } from "@/app/types/movies/movie/MovieResponse";
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
  const movie: MovieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return {
    title: movieMetadataTitle(movie.title, movie.release_date, "Translations"),
    description: movie.tagline,
  };
}

const MovieTranslationsPage = ({ params: { id } }: Props) => {
  const actualId = parseInt(id);

  return (
    <>
      <MainMovieLeftSidebarTemplate
        title="Translations"
        sidebar={
          <MainMovieTranslationsFiltering
            id={actualId}
            queryKey={RQ_MOVIE_TRANSLATIONS_KEY}
          />
        }
        content={
          <ShowcaseTranslationsMovies
            id={actualId}
            queryKey={RQ_MOVIE_TRANSLATIONS_KEY}
          />
        }
      />
    </>
  );
};

export default MovieTranslationsPage;
