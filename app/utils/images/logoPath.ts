import { TMDB_API_Configuration } from "@/app/types/TMDB_API_Configuration";
import noImage from "../../../public/no-entry-sign.svg";

export const enum LogoSizes {
  "w45" = 0,
  "w92",
  "w154",
  "w185",
  "w300",
  "w500",
  "original",
}

const LogoPath = (
  config: TMDB_API_Configuration | null | undefined,
  posterPath: string | null | undefined,
  size: LogoSizes = LogoSizes.original
) => {
  if (posterPath === null) return noImage;

  if (config)
    return (
      config?.images.secure_base_url +
      config?.images.profile_sizes[size] +
      posterPath
    );

  return noImage;
};

export default LogoPath;
