"use client";

import { RQ_CONFIG_KEY } from "@/app/constants";
import { TMDB_API_Configuration } from "@/app/types/TMDB_API_Configuration";
import PosterPath from "@/app/utils/images/posterPath";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface Props {
  alt: string;
  path: string | null;
}

const TMDBImage = ({ alt, path }: Props) => {
  const { data } = useQuery<TMDB_API_Configuration>({
    queryKey: [RQ_CONFIG_KEY],
  });

  const posterPath = PosterPath(data, path);

  return (
    <>
      <Image
        src={posterPath}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
        alt={alt}
        width={500}
        height={750}
        sizes="(min-width: 1280px) 219px, (min-width: 1040px) calc(25vw - 24px), (min-width: 780px) calc(33.33vw - 19px), (min-width: 640px) calc(50vw - 22px), (min-width: 580px) 500px, 89.23vw"
      />
    </>
  );
};

export default TMDBImage;
