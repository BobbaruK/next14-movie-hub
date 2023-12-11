import { CONFIG_ERROR_IMAGE } from "@/app/constants";
import { TMDB_API_Configuration } from "@/app/types/config";

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
  if (posterPath === null)
    return "https://placehold.co/500x750?text=Profile+Missing";

  if (config)
    return (
      config?.images.secure_base_url +
      config?.images.profile_sizes[size] +
      posterPath
    );

  return CONFIG_ERROR_IMAGE;
};

export default ProfilePath;
