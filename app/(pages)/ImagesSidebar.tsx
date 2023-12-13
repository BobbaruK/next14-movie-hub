"use client";

import { RQ_IMAGES_KEY, RQ_LANGUAGES_KEY } from "@/app/constants";
import { ImageType, ImagesResponse } from "@/app/types/movies/ImagesResponse";
import { Language } from "@/app/types/movies/Language";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  id: number;
  type: ImageType;
  languageParam: string | undefined;
}

const ImagesSidebar = ({ id, type, languageParam }: Props) => {
  const { data: languages } = useQuery<Language[]>({
    queryKey: [RQ_LANGUAGES_KEY],
  });

  const { data: images } = useQuery<ImagesResponse>({
    queryKey: [RQ_IMAGES_KEY, id],
  });

  const renderedImages = images![type];

  const renderedImagesLangs = [] as string[];

  renderedImages.forEach((image) => {
    if (
      image.iso_639_1 !== null &&
      !renderedImagesLangs.includes(image.iso_639_1)
    )
      renderedImagesLangs.push(image.iso_639_1);
  });

  return (
    <>
      <ul className="flex flex-col gap-1">
        {renderedImages.filter((imgs) => imgs.iso_639_1 === null).length >
          0 && (
          <li
            className={[
              languageParam === "no_language" ? "bg-slate-200" : "",
              "p-2",
            ].join(" ")}>
            <Link
              href="?image_language=no_language"
              className="flex items-center justify-between w-full">
              No Language
              <div className="badge badge-secondary text-secondary-content gap-2 p-3">
                {
                  renderedImages.filter((imgs) => imgs.iso_639_1 === null)
                    .length
                }
              </div>
            </Link>
          </li>
        )}
        {renderedImagesLangs.map((lang) => (
          <li
            key={lang}
            className={[
              languageParam === lang ? "bg-slate-200" : "",
              "p-2",
            ].join(" ")}>
            <Link
              href={`?image_language=${lang}`}
              className="flex items-center justify-between w-full">
              {
                languages?.find((language) => language.iso_639_1 === lang)
                  ?.english_name
              }{" "}
              <div className="badge badge-secondary text-secondary-content gap-2 p-3">
                {
                  renderedImages.filter((imgs) => imgs.iso_639_1 === lang)
                    .length
                }
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ImagesSidebar;
