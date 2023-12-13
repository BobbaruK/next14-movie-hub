"use client";
import { useQuery } from "@tanstack/react-query";
import { MovieResponse } from "../types/movies/MovieResponse";
import { TVShowResponse } from "../types/movies/TVShowResponse";

interface Props {
  id: number;
  queryKey: string;
}

const MainMovieSection = ({ id, queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<MovieResponse | TVShowResponse>({
    queryKey: [queryKey, id],
  });

  if (error) throw new Error("Something went wrong while fetching Data");

  if (isLoading)
    return <div className="alert alert-info">Loading movie...</div>;

  return <>bla bladsadsas</>;
};

export default MainMovieSection;