import React, { ReactNode } from "react";
import { ImagesContext } from "./ImageContext";
import { ImageSEO } from "@/app/types/ImageSEO";

interface Props {
  children: ReactNode;
  className: string;
}

const ImagesShowcaseProvider = ({ children, className }: Props) => {
  return (
    <ImagesContext.Provider value={{ className: className } as ImageSEO}>
      {children}
    </ImagesContext.Provider>
  );
};

export default ImagesShowcaseProvider;
