import { TMDB_API_Configuration } from "@/app/types/config";
import noImage from "../../../public/no-entry-sign.svg";

export const enum ProfileSizes {
  "w45" = 0,
  "w185",
  "h632",
  "original",
}

const ProfilePath = (
  config: TMDB_API_Configuration | null | undefined,
  posterPath: string | null | undefined,
  size: ProfileSizes = ProfileSizes.original
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

export default ProfilePath;
