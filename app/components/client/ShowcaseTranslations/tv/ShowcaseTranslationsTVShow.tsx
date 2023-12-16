"use client";

import { TranslationsResponse } from "@/app/types/movies/TranslationsResponse";
import { TVShowTranslationData } from "@/app/types/movies/tv/TVShowTranslationData";
import { useQuery } from "@tanstack/react-query";

interface Props {
  id: number;
  queryKey: string;
}

const ShowcaseTranslationsTVShow = ({ id, queryKey }: Props) => {
  const { data } = useQuery<TranslationsResponse<TVShowTranslationData>>({
    queryKey: [queryKey, id],
  });

  const translations = [...(data?.translations || [])];

  translations.sort((a, b) => {
    if (a.english_name.toLowerCase() < b.english_name.toLowerCase()) return -1;
    if (a.english_name.toLowerCase() > b.english_name.toLowerCase()) return 1;
    return 0;
  });

  return (
    <div className="flex flex-col gap-4">
      {translations.map((translation, index) => (
        <div
          key={translation.english_name + index}
          id={`${translation.iso_639_1}-${translation.iso_3166_1}`}
          className="shadow-md shadow-accent border border-accent rounded flex flex-col overflow-hidden">
          <div className="p-2 bg-accent text-accent-content">
            {translation.english_name}{" "}
            <span className="text-slate-700">
              ({translation.iso_639_1}-{translation.iso_3166_1})
            </span>
          </div>
          <div className="flex">
            <div className="p-2 basis-2/12">Title:</div>
            <div className="p-2 basis-10/12">
              {translation.data.name ? translation.data.name : "-"}
            </div>
          </div>
          <div className="flex">
            <div className="p-2 basis-2/12">Tagline:</div>
            <div className="p-2 basis-10/12">
              {translation.data.tagline ? translation.data.tagline : "-"}
            </div>
          </div>
          <div className="flex">
            <div className="p-2 basis-2/12">Overview:</div>
            <div className="p-2 basis-10/12">
              {translation.data.overview ? translation.data.overview : "-"}
            </div>
          </div>
          <div className="flex">
            <div className="p-2 basis-2/12">Homepage:</div>
            <div className="p-2 basis-10/12">
              {translation.data.homepage ? (
                <a href={translation.data.homepage} target="_blank">
                  {translation.data.homepage}
                </a>
              ) : (
                "-"
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowcaseTranslationsTVShow;
