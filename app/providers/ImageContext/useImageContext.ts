import { useContext } from "react";
import { ImagesContext } from "./ImageContext";

const useImageContext = () => useContext(ImagesContext);

export default useImageContext;
