import React from "react";

interface Props {
  params: {
    id: number;
  };
}

const MoviePage = ({ params: { id } }: Props) => {
  return <h1>Movie: {id}</h1>;
};

export default MoviePage;
