import { ImageShowcase } from "@/app/components/client/ImageShowcase";
import { ImagesFiltering } from "@/app/components/client/ImagesFiltering";
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
    title: movieMetadataTitle(movie.title, movie.release_date, "Backdrops"),
    description: movie.tagline,
  };
}

const MovieBackdropsPage = ({
  params: { id },
  searchParams: { image_language },
}: Props) => {
  const actualId = parseInt(id);

  return (
    <>
      <div className="appContaier flex flex-col lg:flex-row gap-8">
        <div className="lg:basis-1/4 xl:basis-2/12 ">
          <div className="imagesSidebar">
            <h1 className="py-4 px-2 m-0 bg-accent text-accent-content">
              Backdrops
            </h1>
            <ImagesFiltering
              id={actualId}
              type="backdrops"
              languageParam={image_language}
              queryKey={RQ_MOVIE_IMAGES_KEY}
            />
          </div>
        </div>
        <div className="lg:basis-3/4 xl:basis-10/12">
          <ImageShowcase
            id={actualId}
            type="backdrops"
            languageParam={image_language}
            queryKey={RQ_MOVIE_IMAGES_KEY}
            imageSizes="(min-width: 1280px) 330px, (min-width: 1040px) calc(25vw - 24px), (min-width: 780px) calc(33.33vw - 19px), (min-width: 640px) calc(50vw - 22px), calc(100vw - 32px)"
            grid="sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
            imageClassName="sm:h-52 object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default MovieBackdropsPage;
