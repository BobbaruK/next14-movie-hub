"use client";

import { RQ_CONFIG_KEY } from "@/app/constants";
import useImageContext from "@/app/providers/ImageContext/useImageContext";
import { TMDB_API_Configuration } from "@/app/types/TMDB_API_Configuration";
import { BackdropSizes, LogoSizes, PosterSizes } from "@/app/types/imageSizes";
import { ImageType } from "@/app/types/movies/ImagesResponse";
import BackdropPath from "@/app/utils/images/backdropPath";
import LogoPath from "@/app/utils/images/logoPath";
import PosterPath from "@/app/utils/images/posterPath";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface BaseProps {
  alt: string;
  path: string | undefined | null;
  width: number;
  height: number;
  sizes?: string;
  type: ImageType;
}

interface Backdrops extends BaseProps {
  type: "backdrops";
  size?: BackdropSizes;
}

interface Logos extends BaseProps {
  type: "logos";
  size?: LogoSizes;
}

interface Posters extends BaseProps {
  type: "posters";
  size?: PosterSizes;
}

type Props = Backdrops | Logos | Posters;

const TMDBImage = ({ alt, path, width, height, sizes, type, size }: Props) => {
  const { data } = useQuery<TMDB_API_Configuration>({
    queryKey: [RQ_CONFIG_KEY],
  });

  let posterPath;

  switch (type) {
    case "posters":
      posterPath = PosterPath(data, path, size || PosterSizes.w342);
      break;

    case "backdrops":
      posterPath = BackdropPath(data, path, size || BackdropSizes.w780);
      break;

    case "logos":
      posterPath = LogoPath(data, path, size || LogoSizes.w500);
      break;

    default:
      break;
  }

  const imageDetails = useImageContext();

  return (
    <>{type}
      <Image
        className={`max-w-full ${imageDetails.className || ""}`}
        src={posterPath}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
      />
    </>
  );
};

export default TMDBImage;
