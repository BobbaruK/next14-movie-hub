import { ReactNode } from "react";

interface Props {
  title: string;
  sidebar: ReactNode;
  content: ReactNode;
}

const MainMovieLeftSidebarTemplate = ({ title, sidebar, content }: Props) => {
  return (
    <>
      <div className="appContaier flex flex-col lg:flex-row gap-8">
        <div className="lg:basis-1/4 xl:basis-2/12 ">
          <div className="flex flex-col gap-4 shadow-md shadow-accent border border-accent rounded-md overflow-hidden">
            <h1 className="py-4 px-2 m-0 bg-accent text-accent-content">
              {title}
            </h1>
            {sidebar}
          </div>
        </div>
        <div className="lg:basis-3/4 xl:basis-10/12">{content}</div>
      </div>
    </>
  );
};

export default MainMovieLeftSidebarTemplate;
