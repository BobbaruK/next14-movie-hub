import { MainSidebar } from "@/app/components/Sidebar/main";
import { MainMovieHero } from "@/app/components/client/MainMovieHero";
import { MainMovieNavigation } from "@/app/components/client/MainMovieNavigation";
import { RQ_MOVIE_KEY } from "@/app/constants";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: {
    id: string;
  };
}

const MainMovieRightSidebarLayout = ({ children, params: { id } }: Props) => {
  const movieId = parseInt(id);

  return (
    <>
      <MainMovieNavigation id={movieId} />
      <MainMovieHero id={movieId} queryKey={RQ_MOVIE_KEY} />
      <div className="appContaier flex flex-col lg:flex-row gap-8">
        <div className="lg:basis-3/4">{children}</div>
        <div className="lg:basis-1/4">
          movie st
          <MainSidebar />
        </div>
      </div>
    </>
  );
};

export default MainMovieRightSidebarLayout;
