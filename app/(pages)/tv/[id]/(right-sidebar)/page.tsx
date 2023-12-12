import MainMovieSection from "@/app/(pages)/MainMovieSection";
import { RQ_TVSHOW_KEY } from "@/app/constants";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const TVShowPage = ({ params: { id } }: Props) => {
  const actualId = parseInt(id);

  return (
    <>
      <h1>TVShow: {actualId}</h1>
      <MainMovieSection id={actualId} queryKey={RQ_TVSHOW_KEY} />
    </>
  );
};

export default TVShowPage;
