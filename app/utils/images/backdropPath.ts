import { TMDB_API_Configuration } from "@/app/types/TMDB_API_Configuration";
import noImage from "../../../public/no-entry-sign.svg";

export const enum BackdropSizes {
  "w300" = 0,
  "w780",
  "w1280",
  "original",
}

const BackdropPath = (
  config: TMDB_API_Configuration | null | undefined,
  posterPath: string | null | undefined,
  size: BackdropSizes = BackdropSizes.original
) => {
  if (posterPath === null) return noImage;

  if (config)
    return (
      config?.images.secure_base_url +
      config?.images.backdrop_sizes[size] +
      posterPath
    );

  return noImage;
};

export default BackdropPath;
