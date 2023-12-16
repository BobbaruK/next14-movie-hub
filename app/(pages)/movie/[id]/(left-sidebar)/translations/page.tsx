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

const MovieTranslationsPage = () => {
  return (
    <>
      <div className="appContaier flex flex-col lg:flex-row gap-8">
        <div className="lg:basis-1/4 xl:basis-2/12 ">
          <div className="imagesSidebar">
            <h1 className="py-4 px-2 m-0 bg-accent text-accent-content">
              Translations
            </h1>
            {/* <MainMovieImagesFiltering
              id={actualId}
              type="backdrops"
              languageParam={image_language}
              queryKey={RQ_MOVIE_IMAGES_KEY}
            /> */}
          </div>
        </div>
        <div className="lg:basis-3/4 xl:basis-10/12">
          <h1>dsadsa</h1>
        </div>
      </div>
    </>
  );
};

export default MovieTranslationsPage;
