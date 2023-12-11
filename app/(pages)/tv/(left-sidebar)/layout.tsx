import { MainSidebar } from "@/app/components/Sidebar/main";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

const LeftSidebarTVShowLayout = ({ children }: Props) => {
  return (
    <>
      {/* <MovieNavigation id={id} /> */}
      <div className="appContaier flex flex-col lg:flex-row gap-8">
        <div className="lg:basis-1/4">
          <MainSidebar />
        </div>
        <div className="lg:basis-3/4">{children}</div>
      </div>
    </>
  );
};

export default LeftSidebarTVShowLayout;
