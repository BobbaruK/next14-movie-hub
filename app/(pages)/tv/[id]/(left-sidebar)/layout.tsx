import { MainTVShowNavigation } from "@/app/components/client/MainTVShowNavigation";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  params: {
    id: number;
  };
}

const MainTVShowLeftSidebarLayout = ({ children, params: { id } }: Props) => {
  return (
    <>
      <MainTVShowNavigation id={id} />
      {children}
    </>
  );
};

export default MainTVShowLeftSidebarLayout;
