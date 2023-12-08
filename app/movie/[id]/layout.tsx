import Link from "next/link";
import { ReactNode } from "react";
import MovieNavigation from "./MovieNavigation";

interface Props {
  children: ReactNode;
  params: {
    id: number;
  };
}

const MovieLayout = ({ children, params: { id } }: Props) => {
  return (
    <>
      <MovieNavigation id={id} />
      {children}
    </>
  );
};

export default MovieLayout;
