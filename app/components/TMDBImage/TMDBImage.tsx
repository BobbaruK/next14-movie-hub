"use client";

import { RQ_CONFIG_KEY } from "@/app/constants";
import { TMDB_API_Configuration } from "@/app/types/config";
import PosterPath from "@/app/utils/images/posterPath";
import { useQuery } from "@tanstack/react-query";

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
      <img src={posterPath} alt={alt} />
    </>
  );
};

export default TMDBImage;
