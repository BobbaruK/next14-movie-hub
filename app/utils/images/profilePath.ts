import { TMDB_API_Configuration } from "@/app/types/TMDB_API_Configuration";
import noImage from "../../../public/no-entry-sign.svg";
import { ProfileSizes } from "@/app/types/imageSizes";

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
