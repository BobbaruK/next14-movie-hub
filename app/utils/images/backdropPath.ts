import { CONFIG_ERROR_IMAGE } from "@/app/constants";
import { TMDB_API_Configuration } from "@/app/types/config";

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
  if (posterPath === null)
    return "https://placehold.co/500x750?text=Backdrop+Missing";

  if (config)
    return (
      config?.images.secure_base_url +
      config?.images.backdrop_sizes[size] +
      posterPath
    );

  return CONFIG_ERROR_IMAGE;
};

export default BackdropPath;
