import { ImageShowcase } from "@/app/components/client/ImageShowcase";
import { MainMovieImagesFiltering } from "@/app/components/client/MainMovieImagesFiltering";
import { MainMovieLeftSidebarTemplate } from "@/app/components/server/MainMovieLeftSidebarTemplate";
import { RQ_MOVIE_IMAGES_KEY } from "@/app/constants";
import { MovieResponse } from "@/app/types/movies/movie/MovieResponse";
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
  const movie: MovieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return {
    title: movieMetadataTitle(movie.title, movie.release_date, "Logos"),
    description: movie.tagline,
  };
}

const MovieLogosPage = ({
  params: { id },
  searchParams: { image_language },
}: Props) => {
  const actualId = parseInt(id);

  return (
    <>
      <MainMovieLeftSidebarTemplate
        title="Logos"
        sidebar={
          <MainMovieImagesFiltering
            id={actualId}
            type="logos"
            languageParam={image_language}
            queryKey={RQ_MOVIE_IMAGES_KEY}
          />
        }
        content={
          <ImageShowcase
            id={actualId}
            type="logos"
            languageParam={image_language}
            queryKey={RQ_MOVIE_IMAGES_KEY}
            imageSizes="(min-width: 1280px) 174px, (min-width: 1040px) calc(18.64vw - 39px), (min-width: 780px) calc(33.33vw - 37px), (min-width: 640px) calc(50vw - 40px), calc(100vw - 48px)"
            grid="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            imageClassName="h-auto w-full p-2"
          />
        }
      />
    </>
  );
};

export default MovieLogosPage;
