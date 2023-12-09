import React from "react";

interface Props {
  params: {
    id: number;
  };
}

const TVShowPage = ({ params: { id } }: Props) => {
  return <h1>TVShow: {id}</h1>;
};

export default TVShowPage;
