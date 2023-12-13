import { MainSidebar } from "@/app/components/Sidebar/main";
import { ReactNode } from "react";
import TVShowNavigation from "../TVShowNavigation";
interface Props {
  children: ReactNode;
  params: {
    id: number;
  };
}

const MainTVShowLeftSidebarLayout = ({ children, params: { id } }: Props) => {
  return (
    <>
      <TVShowNavigation id={id} />
      {children}
    </>
  );
};

export default MainTVShowLeftSidebarLayout;
