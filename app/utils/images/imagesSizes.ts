import {
  BackdropSizes,
  LogoSizes,
  PosterSizes,
  ProfileSizes,
} from "@/app/types/imageSizes";

interface ImagesSizes {
  backdrops: BackdropSizes[];
  logos: LogoSizes[];
  posters: PosterSizes[];
  profiles: ProfileSizes[];
}

const imagesSizes = (): ImagesSizes => ({
  backdrops: [
    BackdropSizes.w300,
    BackdropSizes.w780,
    BackdropSizes.w1280,
    BackdropSizes.original,
  ],
  logos: [
    LogoSizes.w45,
    LogoSizes.w92,
    LogoSizes.w154,
    LogoSizes.w185,
    LogoSizes.w300,
    LogoSizes.w500,
    LogoSizes.original,
  ],
  posters: [
    PosterSizes.w92,
    PosterSizes.w154,
    PosterSizes.w185,
    PosterSizes.w342,
    PosterSizes.w500,
    PosterSizes.w780,
    PosterSizes.original,
  ],
  profiles: [
    ProfileSizes.w45,
    ProfileSizes.w185,
    ProfileSizes.h632,
    ProfileSizes.original,
  ],
});

export default imagesSizes;
