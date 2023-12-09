import Link from "next/link";
import { ReactNode } from "react";
import TVShowNavigation from "./TVShowNavigation";

interface Props {
  children: ReactNode;
  params: {
    id: string;
  };
}

const TVShowLayout = ({ children, params: { id } }: Props) => {
  return (
    <>
      <TVShowNavigation id={id} />
      <div className="content">{children}</div>
    </>
  );
};

export default TVShowLayout;
