export interface TranslationsResponse<T> {
  id: number;
  translations: Translation<T>[];
}

export interface Translation<T> {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: T;
}
