import { TMDB_API_Configuration } from "@/app/types/config";
import noImage from "../../../public/no-entry-sign.svg";

export const enum PosterSizes {
  "w92" = 0,
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original",
}

const PosterPath = (
  config: TMDB_API_Configuration | null | undefined,
  posterPath: string | null | undefined,
  size: PosterSizes = PosterSizes.w500
) => {
  if (posterPath === null) return noImage;

  if (config)
    return (
      config?.images.secure_base_url +
      config?.images.poster_sizes[size] +
      posterPath
    );

  return noImage;
};

export default PosterPath;
