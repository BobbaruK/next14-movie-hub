import { ReactNode } from "react";
import MovieNavigation from "../MovieNavigation";
interface Props {
  children: ReactNode;
  params: {
    id: number;
  };
}

const MainMovieLeftSidebarLayout = ({ children, params: { id } }: Props) => {
  return (
    <>
      <MovieNavigation id={id} />
      {children}
    </>
  );
};

export default MainMovieLeftSidebarLayout;
