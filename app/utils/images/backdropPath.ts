import { TMDB_API_Configuration } from "@/app/types/TMDB_API_Configuration";
import noImage from "../../../public/no-entry-sign.svg";
import { BackdropSizes } from "@/app/types/imageSizes";

const BackdropPath = (
  config: TMDB_API_Configuration | null | undefined,
  posterPath: string | null | undefined,
  size: BackdropSizes = BackdropSizes.original
): string => {
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
