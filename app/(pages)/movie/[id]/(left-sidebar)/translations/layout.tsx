import {
  RQ_MOVIE_TRANSLATIONS_ENDPOINT,
  RQ_MOVIE_TRANSLATIONS_KEY,
} from "@/app/constants";
import APIClient from "@/app/services/tmdbApiClient";
import { TMDB_TranslationsResponse } from "@/app/types/movies/TranslationsResponse";
import { MovieTranslationData } from "@/app/types/movies/movie/MovieTranslationData";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: {
    id: string;
  };
}

const MainMovieTranslationsLayout = async ({
  children,
  params: { id },
}: Props) => {
  const actualId = parseInt(id);

  const queryClient = new QueryClient();

  const apiClientTranslations = new APIClient<
    TMDB_TranslationsResponse<MovieTranslationData>
  >(RQ_MOVIE_TRANSLATIONS_ENDPOINT(id));
  await queryClient.prefetchQuery({
    queryKey: [RQ_MOVIE_TRANSLATIONS_KEY, actualId],
    queryFn: () => apiClientTranslations.getAll(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </>
  );
};

export default MainMovieTranslationsLayout;
