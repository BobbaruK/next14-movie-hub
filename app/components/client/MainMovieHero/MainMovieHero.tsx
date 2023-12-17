"use client";

import { RQ_CONFIG_KEY } from "@/app/constants";
import { TMDB_API_Configuration } from "@/app/types/TMDB_API_Configuration";
import { MovieResponse } from "@/app/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/app/types/movies/tv/TVShowResponse";
import BackdropPath, { BackdropSizes } from "@/app/utils/images/backdropPath";
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
          {/* <TMDBImage
            alt={title}
            width={3840}
            height={2160}
            path={"original/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg"}
            sizes="100vw"
            type="backdrops"
          /> */}
        </div>
        <div className="absolute -z-10 w-full h-full inset-0 bg-primary opacity-95 bg-gradient-to-r from-primary to-secondary"></div>
        <div className="appContaier flex flex-col lg:flex-row gap-8 text-primary-content">
          <div className="lg:basis-1/4">
            <div className="rounded-lg w-full overflow-hidden">
              {/* <TMDBImage
                alt={title}
                width={384}
                height={576}
                path={posterPath}
                sizes="(min-width: 1380px) 304px, (min-width: 1040px) calc(18.75vw + 49px), calc(100vw - 32px)"
                type="posters"
              /> */}
              <img
                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                alt={title}
                width={1136}
                height={1704}
                sizes="(min-width: 1380px) 304px, (min-width: 1040px) calc(18.75vw + 49px), calc(100vw - 32px)"
                srcSet={`https://image.tmdb.org/t/p/w92${movie?.poster_path} 92w, https://image.tmdb.org/t/p/w154${movie?.poster_path} 154w, https://image.tmdb.org/t/p/w185${movie?.poster_path} 185w, https://image.tmdb.org/t/p/w342${movie?.poster_path} 342w, https://image.tmdb.org/t/p/w500${movie?.poster_path} 500w, https://image.tmdb.org/t/p/w780${movie?.poster_path} 780w, https://image.tmdb.org/t/p/original${movie?.poster_path} 1136w`}
                loading="eager"
              />
            </div>
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
    </>
  );
};

export default MainMovieHero;
