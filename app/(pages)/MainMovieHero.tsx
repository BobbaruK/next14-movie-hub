"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { RQ_CONFIG_KEY } from "../constants";
import { TMDB_API_Configuration } from "../types/TMDB_API_Configuration";
import { MovieResponse } from "../types/movies/MovieResponse";
import { TVShowResponse } from "../types/movies/TVShowResponse";
import BackdropPath, { BackdropSizes } from "../utils/images/backdropPath";
import PosterPath from "../utils/images/posterPath";
import instanceOf from "../utils/instanceOf";
import ReleaseDateUI from "../utils/releaseDateUI";

interface Props {
  id: number;
  queryKey: string;
}

const MainMovieHero = ({ id, queryKey }: Props) => {
  const { data: config } = useQuery<TMDB_API_Configuration>({
    queryKey: [RQ_CONFIG_KEY],
  });

  const { data: movie } = useQuery<MovieResponse | TVShowResponse>({
    queryKey: [queryKey, id],
  });

  const instanceOfMovie = instanceOf<MovieResponse>(movie);

  const backdropPath = BackdropPath(
    config,
    movie?.backdrop_path,
    BackdropSizes.original
  );
  const posterPath = PosterPath(config, movie?.poster_path);
  const { releaseDate, year } = ReleaseDateUI(
    instanceOfMovie ? movie?.release_date : movie?.first_air_date
  );

  const title = instanceOfMovie ? movie.title : (movie?.name as string);

  return (
    <div className="py-20 relative">
      <Image
        className="absolute -z-20 w-full h-full inset-0 object-cover"
        src={backdropPath}
        alt={title}
        width={3840}
        height={2160}
        priority={true}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
        sizes="100vw"
      />
      <div className="absolute -z-10 w-full h-full inset-0 bg-primary opacity-90 bg-gradient-to-r from-primary to-secondary"></div>
      <div className="appContaier flex flex-col lg:flex-row gap-8 text-primary-content">
        <div className="lg:basis-1/4">
          <Image
            className="rounded-lg w-full"
            src={posterPath}
            alt={title}
            width={296}
            height={444}
            priority={true}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
            sizes="(min-width: 1340px) 296px, (min-width: 1040px) calc(18.57vw + 51px), (min-width: 400px) 296px, calc(35vw + 163px)"
          />
        </div>
        <div className="lg:basis-3/4 flex flex-col gap-8 justify-center">
          <h1 className="m-0">
            {title} ({year})
          </h1>
          <div className="flex flex-wrap gap-4">
            <div className="">{releaseDate}</div>
            &bull;
            <div className="">
              {movie?.genres.map((genre, index) => (
                <React.Fragment key={genre.id}>
                  <span>{genre.name}</span>
                  {movie.genres.length === index + 1 ? "" : ","}&nbsp;
                </React.Fragment>
              ))}
            </div>
            &bull;
            <div className="">
              {instanceOfMovie
                ? `${movie?.runtime} minutes`
                : movie?.episode_run_time.length
                ? `${movie?.episode_run_time[0]} minutes`
                : "unknowm"}
            </div>
          </div>
          <p className="">
            <em>{movie?.tagline}</em>
          </p>
          <p>{movie?.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MainMovieHero;
