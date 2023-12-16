import { MainMovieNavigation } from "@/app/components/client/MainMovieNavigation";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  params: {
    id: number;
  };
}

const MainMovieLeftSidebarLayout = ({ children, params: { id } }: Props) => {
  return (
    <>
      <MainMovieNavigation id={id} type="movie" />
      {children}
    </>
  );
};

export default MainMovieLeftSidebarLayout;
