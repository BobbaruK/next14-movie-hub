import { link } from "fs";
import React from "react";

interface Props {
  params: {
    id: number;
  };
}

const MoviePage = ({ params: { id } }: Props) => {
  const name = "Trolls Band Together";

  const linkId = 213141 + "-" + name.replace(/\s+/g, "-").toLowerCase();

  console.log(parseInt(linkId));

  return <h1>Movie: {id}</h1>;
};

export default MoviePage;
