import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { STALE_TIME } from "../constants";
import APIClient from "../services/tmdbApiClient";
import { MoviesResponse } from "../types/movie";

const movies = new APIClient<MoviesResponse>("discover/movie");

const useRQMovies = (config: AxiosRequestConfig) =>
  useQuery({
    queryKey: ["movies", config.params],
    queryFn: () => movies.getAll(config),
    staleTime: STALE_TIME,
    placeholderData: keepPreviousData,
  });

export default useRQMovies;
