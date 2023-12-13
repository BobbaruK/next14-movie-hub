"use client";

import { RQ_LANGUAGES_KEY } from "@/app/constants";
import { Language } from "@/app/types/movies/Language";
import { useQuery } from "@tanstack/react-query";

interface Props {
  language: string | null;
}

const ImageLanguage = ({ language }: Props) => {
  if (!language) return;

  const { data } = useQuery<Language[]>({
    queryKey: [RQ_LANGUAGES_KEY],
  });

  const lang = data?.find((lang) => lang.iso_639_1 === language);

  return (
    <p>
      Language: {lang?.name}({lang?.english_name})
    </p>
  );
};

export default ImageLanguage;
