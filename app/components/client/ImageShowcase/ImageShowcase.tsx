"use client";

import { RQ_CONFIG_KEY, RQ_LANGUAGES_KEY } from "@/app/constants";
import ImagesShowcaseProvider from "@/app/providers/ImageContext/ImagesShowcaseProvider";
import { TMDB_API_Configuration } from "@/app/types/TMDB_API_Configuration";
import { ImageType, ImagesResponse } from "@/app/types/movies/ImagesResponse";
import { Language } from "@/app/types/movies/Language";
import BackdropPath, { BackdropSizes } from "@/app/utils/images/backdropPath";
import { useQuery } from "@tanstack/react-query";
import { ImageCard } from "../../Card/Image";

interface Props {
  id: number;
  type: ImageType;
  languageParam: string | undefined;
  queryKey: string;
  imageSizes: string;
  grid: string;
  imageClassName: string;
}

const ImageShowcase = ({
  id,
  type,
  languageParam,
  queryKey,
  imageSizes,
  grid,
  imageClassName,
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
      <ImagesShowcaseProvider className={imageClassName}>
        <div className={`grid gap-4 ${grid}`}>
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
        </div>
      </ImagesShowcaseProvider>
    </>
  );
};

export default ImageShowcase;
