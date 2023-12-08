import React from "react";

interface Props {
  params: {
    id: number | string;
  };
}

const PersonPage = ({ params: { id } }: Props) => {
  return <div>PersonPage: {id}</div>;
};

export default PersonPage;
