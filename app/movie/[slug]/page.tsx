import React from "react";

interface Props {
  params: {
    slug: number;
  };
}

const MoviePage = ({ params: { slug } }: Props) => {
  return <div>Movie: {slug}</div>;
};

export default MoviePage;
