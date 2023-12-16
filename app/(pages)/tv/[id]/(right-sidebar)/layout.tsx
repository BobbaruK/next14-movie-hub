import { MainSidebar } from "@/app/components/Sidebar/main";
import { MainMovieHero } from "@/app/components/client/MainMovieHero";
import { RQ_TVSHOW_KEY } from "@/app/constants";
import { ReactNode } from "react";
import TVShowNavigation from "../TVShowNavigation";

interface Props {
  children: ReactNode;
  params: {
    id: string;
  };
}

const MainTVShowRightSidebarLayout = ({ children, params: { id } }: Props) => {
  const movieId = parseInt(id);

  return (
    <>
      <TVShowNavigation id={movieId} />
      <MainMovieHero id={movieId} queryKey={RQ_TVSHOW_KEY} />
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

export default MainTVShowRightSidebarLayout;
