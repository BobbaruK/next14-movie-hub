import ImageShowcase from "@/app/(pages)/ImageShowcase";
import ImagesSidebar from "@/app/(pages)/ImagesSidebar";
import { RQ_MOVIE_IMAGES_KEY } from "@/app/constants";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    image_language: string | undefined;
  };
}

const MoviePostersPage = ({
  params: { id },
  searchParams: { image_language },
}: Props) => {
  const actualId = parseInt(id);

  return (
    <>
      <div className="appContaier flex flex-col lg:flex-row gap-8">
        <div className="lg:basis-1/4 xl:basis-2/12 ">
          <div className="flex flex-col gap-4 shadow-md rounded-md  overflow-hidden">
            <h1 className="py-4 px-2 m-0 bg-accent text-accent-content">
              Posters
            </h1>
            <ImagesSidebar
              id={actualId}
              type="posters"
              languageParam={image_language}
              queryKey={RQ_MOVIE_IMAGES_KEY}
            />
          </div>
        </div>
        <div className="lg:basis-3/4 xl:basis-10/12">
          <ImageShowcase
            id={actualId}
            type="posters"
            languageParam={image_language}
            queryKey={RQ_MOVIE_IMAGES_KEY}
            imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw(min-width: 1280px) 330px, (min-width: 1040px) calc(25vw - 24px), (min-width: 780px) calc(33.33vw - 19px), (min-width: 640px) calc(50vw - 22px), calc(100vw - 32px)"
          />
        </div>
      </div>
    </>
  );
};

export default MoviePostersPage;
