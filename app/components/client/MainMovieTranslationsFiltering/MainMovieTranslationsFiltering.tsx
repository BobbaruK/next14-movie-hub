"use client";

import { RQ_LANGUAGES_KEY } from "@/app/constants";
import { Language } from "@/app/types/movies/Language";
import { TranslationsResponse } from "@/app/types/movies/TranslationsResponse";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  id: number;
  queryKey: string;
}

const MainMovieTranslationsFiltering = ({ id, queryKey }: Props) => {
  const { data: languages } = useQuery<Language[]>({
    queryKey: [RQ_LANGUAGES_KEY],
  });

  const { data } = useQuery<TranslationsResponse>({
    queryKey: [queryKey, id],
  });

  const languagesOutput = [...(data?.translations || [])];

  languagesOutput?.sort((a, b) => {
    if (a.english_name.toLowerCase() < b.english_name.toLowerCase()) return -1;
    if (a.english_name.toLowerCase() > b.english_name.toLowerCase()) return 1;
    return 0;
  });

  return (
    <>
      <ul className="flex flex-col gap-1">
        {languagesOutput?.map((translation, index) => (
          <li key={translation.iso_3166_1 + index} className="p-2 hover:bg-slate-200 hover:text-slate-900" >
            <Link
              href={`#${translation.iso_639_1}-${translation.iso_3166_1}`}
              className={[
                "flex",
                "items-center",
                "justify-between",
                "w-full",
              ].join(" ")}>
              {translation.english_name}
              <div
                className={[
                  "badge",
                  "badge-secondary",
                  "text-secondary-content",
                  "gap-2",
                  "px-1",
                  "py-3",
                  "w-16",
                ].join(" ")}>
                {translation.iso_639_1}-{translation.iso_3166_1}
              </div>
            </Link>
          </li>
        ))}
        {/* {renderedImagesLangs.map((lang) => (
          <li
            key={lang}
            className={[
              languageParam === lang ? "bg-slate-200" : "",
              "p-2",
            ].join(" ")}>
            <Link
              href={`?image_language=${lang}`}
              className={[
                "flex",
                "items-center",
                "justify-between",
                "w-full",
                languageParam === lang ? "text-slate-900" : "",
              ].join(" ")}>
              {
                languages?.find((language) => language.iso_639_1 === lang)
                  ?.english_name
              }{" "}
              <div
                className={[
                  "badge",
                  "badge-secondary",
                  "text-secondary-content",
                  "gap-2",
                  "p-3",
                ].join(" ")}>
                {
                  renderedImages.filter((imgs) => imgs.iso_639_1 === lang)
                    .length
                }
              </div>
            </Link>
          </li>
        ))} */}
      </ul>
    </>
  );
};

export default MainMovieTranslationsFiltering;
