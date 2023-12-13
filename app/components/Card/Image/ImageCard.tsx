import { Image } from "@/app/types/movies/ImagesResponse";
import { TMDBImage } from "../../TMDBImage";
import ImageLanguage from "./ImageLanguage";
import Link from "next/link";

interface Props {
  image: Image;
  href: string;
}

const ImageCard = ({ image, href }: Props) => {
  return (
    <div>
      <div className="card bg-base-100 shadow-xl h-full overflow-hidden">
        <Link href={href} target="_blank">
          <TMDBImage alt="dsa" path={image.file_path} type="backdrops" />
        </Link>
        <div className="flex flex-col gap-4 items-start p-3 ">
          <p>Aspect Ratio: {image.aspect_ratio}</p>
          <p>Width: {image.width}</p>
          <p>Height: {image.height}</p>
          <p>Average vote: {image.vote_average}</p>
          <ImageLanguage language={image.iso_639_1} />
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
