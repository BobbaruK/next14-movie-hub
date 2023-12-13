"use client";

import { useQuery } from "@tanstack/react-query";
import { ImageCard } from "../components/Card/Image";
import {
  RQ_CONFIG_KEY,
  RQ_MOVIE_IMAGES_KEY,
  RQ_LANGUAGES_KEY,
} from "../constants";
import { TMDB_API_Configuration } from "../types/TMDB_API_Configuration";
import {
  Image,
  ImageType,
  ImagesResponse,
} from "../types/movies/ImagesResponse";
import BackdropPath, { BackdropSizes } from "../utils/images/backdropPath";
import { Language } from "../types/movies/Language";

interface Props {
  id: number;
  type: ImageType;
  languageParam: string | undefined;
  queryKey: string;
  imageSizes: string;
}

const ImageShowcase = ({
  id,
  type,
  languageParam,
  queryKey,
  imageSizes,
}: Props) => {
  const { data: config } = useQuery<TMDB_API_Configuration>({
    queryKey: [RQ_CONFIG_KEY],
  });

  const { data: languages } = useQuery<Language[]>({
    queryKey: [RQ_LANGUAGES_KEY],
  });

  const {
    data: images,
    error: imagesError,
    isLoading: imagesIsLoading,
  } = useQuery<ImagesResponse>({
    queryKey: [queryKey, id],
  });

  if (imagesError)
    return <div className="alert alert-info">Loading images...</div>;

  if (imagesIsLoading)
    throw new Error("Something went wrong while fetching Data");

  const renderedImages = images![type];

  const renderedImagesLanguage = (lang: string | undefined) => {
    if (lang === undefined) return renderedImages;

    if (lang === "no_language") {
      return renderedImages.filter((image) => image.iso_639_1 === null);
    }

    return renderedImages.filter((image) => image.iso_639_1 === lang);
  };

  const renderedImagesLangs = [] as string[];

  renderedImages.forEach((image) => {
    if (
      image.iso_639_1 !== null &&
      !renderedImagesLangs.includes(image.iso_639_1)
    )
      renderedImagesLangs.push(image.iso_639_1);
  });

  if (
    languageParam &&
    languageParam !== "no_language" &&
    (languageParam === "" || !renderedImagesLangs.includes(languageParam))
  )
    return (
      <div role="alert" className="alert alert-error">
        <span>
          No images for the{" "}
          {
            languages?.find((language) => language.iso_639_1 === languageParam)
              ?.english_name
          }{" "}
          language
        </span>
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <>
          {renderedImagesLanguage(languageParam)?.map((image) => (
            <ImageCard
              key={image.file_path}
              image={image}
              href={BackdropPath(
                config,
                image.file_path,
                BackdropSizes.original
              )}
              imageSizes={imageSizes}
            />
          ))}
        </>
      </div>
    </>
  );
};

export default ImageShowcase;
