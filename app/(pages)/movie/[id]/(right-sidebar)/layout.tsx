import Link from "next/link";
import { ReactNode } from "react";
import { MainSidebar } from "@/app/components/Sidebar/main";
import MovieNavigation from "../MovieNavigation";

interface Props {
  children: ReactNode;
  params: {
    id: number;
  };
}

const MainMovieRightSidebarLayout = ({ children, params: { id } }: Props) => {
  return (
    <>
      <MovieNavigation id={id} />
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
