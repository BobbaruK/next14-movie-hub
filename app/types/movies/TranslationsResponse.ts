import { MovieTranslationData } from "./movie/MovieTranslationData";
import { TVShowTranslationData } from "./tv/TVShowTranslationData";

export interface TranslationsResponse {
  id: number;
  translations: [];
}

export interface Translation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: MovieTranslationData[] | TVShowTranslationData[];
}
