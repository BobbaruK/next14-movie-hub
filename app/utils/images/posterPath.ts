import { TMDB_API_Configuration } from "@/app/types/TMDB_API_Configuration";
import noImage from "../../../public/no-entry-sign.svg";
import { PosterSizes } from "@/app/types/imageSizes";

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
