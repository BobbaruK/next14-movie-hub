import { ImageShowcase } from "@/app/components/client/ImageShowcase";
import { MainMovieImagesFiltering } from "@/app/components/client/MainMovieImagesFiltering";
import { MainMovieLeftSidebarTemplate } from "@/app/components/server/MainMovieLeftSidebarTemplate";
import { RQ_TVSHOWS_IMAGES_KEY } from "@/app/constants";
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
    title: movieMetadataTitle(movie.name, movie.first_air_date, "Posters"),
    description: movie.tagline,
  };
}

const TVShowPostersPage = ({
  params: { id },
  searchParams: { image_language },
}: Props) => {
  const actualId = parseInt(id);

  return (
    <>
      <MainMovieLeftSidebarTemplate
        title="Posters"
        sidebar={
          <MainMovieImagesFiltering
            id={actualId}
            type="posters"
            languageParam={image_language}
            queryKey={RQ_TVSHOWS_IMAGES_KEY}
          />
        }
        content={
          <ImageShowcase
            id={actualId}
            type="posters"
            languageParam={image_language}
            queryKey={RQ_TVSHOWS_IMAGES_KEY}
            imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw(min-width: 1280px) 330px, (min-width: 1040px) calc(25vw - 24px), (min-width: 780px) calc(33.33vw - 19px), (min-width: 640px) calc(50vw - 22px), calc(100vw - 32px)"
            grid="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
            imageClassName="sm:h-96 object-cover"
          />
        }
      />
    </>
  );
};

export default TVShowPostersPage;
