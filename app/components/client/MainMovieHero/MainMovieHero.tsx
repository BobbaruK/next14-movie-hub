"use client";

import { RQ_CONFIG_KEY } from "@/app/constants";
import { TMDB_API_Configuration } from "@/app/types/TMDB_API_Configuration";
import { BackdropSizes, PosterSizes } from "@/app/types/imageSizes";
import { MovieResponse } from "@/app/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/app/types/movies/tv/TVShowResponse";
import BackdropPath from "@/app/utils/images/backdropPath";
import PosterPath from "@/app/utils/images/posterPath";
import instanceOf from "@/app/utils/instanceOf";
import ReleaseDateUI from "@/app/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TMDBImage } from "../TMDBImage";
import Image from "next/image";

interface Props {
  id: number;
  queryKey: string;
}

const MainMovieHero = ({ id, queryKey }: Props) => {
  const { data: config, isLoading: configIsLoading } =
    useQuery<TMDB_API_Configuration>({
      queryKey: [RQ_CONFIG_KEY],
    });

  const {
    data: movie,
    error: movieError,
    isLoading: movieIsLoading,
  } = useQuery<MovieResponse | TVShowResponse>({
    queryKey: [queryKey, id],
  });

  if (configIsLoading)
    return <div className="alert alert-info">Loading config...</div>;

  if (movieIsLoading)
    return <div className="alert alert-info">Loading movie...</div>;

  if (movieError) throw new Error("Something went wrong while fetching Data");

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
    <>
      <div className="py-20 relative">
        <div className="absolute -z-20 w-full h-full inset-0 [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
          <img
            src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            alt={title}
            width={3840}
            height={2160}
            sizes="100vw"
            srcSet={`https://image.tmdb.org/t/p/w300${movie?.backdrop_path} 300w, https://image.tmdb.org/t/p/w780${movie?.backdrop_path} 780w, https://image.tmdb.org/t/p/w1280${movie?.backdrop_path} 1280w, https://image.tmdb.org/t/p/original${movie?.backdrop_path} 3840w`}
            loading="eager"
          />
        </div>
        <div className="absolute -z-10 w-full h-full inset-0 bg-primary opacity-80 bg-gradient-to-r from-primary to-secondary"></div>
        <div className="appContaier flex flex-col md:flex-row gap-8 text-primary-content">
          <div className="sm:basis-2/6 lg:basis-1/4 flex justify-center items-center">
            <div className="rounded-lg overflow-hidden max-w-[342px]">
              <TMDBImage
                alt={title}
                path={movie?.poster_path}
                type="posters"
                width={1136}
                height={1704}
                sizes="(min-width: 1280px) 219px, (min-width: 1040px) calc(25vw - 24px), (min-width: 780px) calc(33.33vw - 19px), (min-width: 640px) calc(50vw - 22px), calc(100vw - 32px)"
                size={PosterSizes.w342}
              />
            </div>
          </div>
          <div className="sm:basis-4/6 lg:basis-3/4 flex flex-col gap-8 justify-center">
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
    </>
  );
};

export default MainMovieHero;
