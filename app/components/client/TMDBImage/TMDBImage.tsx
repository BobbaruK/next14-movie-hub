"use client";

import { RQ_CONFIG_KEY } from "@/app/constants";
import useImageContext from "@/app/providers/ImageContext/useImageContext";
import { TMDB_API_Configuration } from "@/app/types/TMDB_API_Configuration";
import { ImageType } from "@/app/types/movies/ImagesResponse";
import BackdropPath, { BackdropSizes } from "@/app/utils/images/backdropPath";
import LogoPath, { LogoSizes } from "@/app/utils/images/logoPath";
import PosterPath, { PosterSizes } from "@/app/utils/images/posterPath";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface Props {
  alt: string;
  path: string | null;
  width: number;
  height: number;
  sizes: string;
  type: ImageType;
}

const TMDBImage = ({ alt, path, width, height, sizes, type }: Props) => {
  const { data } = useQuery<TMDB_API_Configuration>({
    queryKey: [RQ_CONFIG_KEY],
  });

  let posterPath;

  switch (type) {
    case "posters":
      posterPath = PosterPath(data, path, PosterSizes.w500);
      break;

    case "backdrops":
      posterPath = BackdropPath(data, path, BackdropSizes.w780);
      break;

    case "logos":
      posterPath = LogoPath(data, path, LogoSizes.w500);
      break;

    default:
      break;
  }

  const imageDetails = useImageContext();

  return (
    <>
      <Image
        className={`max-w-full ${imageDetails.className || ""}`}
        src={posterPath}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
        // alt={alt}
        alt={"if image is not loaded, failed with a status of 402 - payment"}
        width={width}
        height={height}
        sizes={sizes}
        // sizes="(min-width: 1280px) 219px, (min-width: 1040px) calc(25vw - 24px), (min-width: 780px) calc(33.33vw - 19px), (min-width: 640px) calc(50vw - 22px), (min-width: 580px) 500px, 89.23vw"
      />
    </>
  );
};

export default TMDBImage;