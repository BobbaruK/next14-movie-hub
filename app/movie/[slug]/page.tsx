import React from "react";

interface Props {
  params: {
    slug: number;
  };
}

const MoviePage = ({ params: { slug } }: Props) => {
  return <h1>Movie: {slug}</h1>;
};

export default MoviePage;
