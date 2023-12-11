import { MainSidebar } from "@/app/components/Sidebar/main";
import { ReactNode } from "react";
import TVShowNavigation from "../TVShowNavigation";

interface Props {
  children: ReactNode;
  params: {
    id: number;
  };
}

const MainTVShowRightSidebarLayout = ({ children, params: { id } }: Props) => {
  return (
    <>
      <TVShowNavigation id={id} />
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
