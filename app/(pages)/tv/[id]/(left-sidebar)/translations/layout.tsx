import {
  RQ_TV_SHOWS_TRANSLATIONS_ENDPOINT,
  RQ_TV_SHOWS_TRANSLATIONS_KEY,
} from "@/app/constants";
import APIClient from "@/app/services/tmdbApiClient";
import { TranslationsResponse } from "@/app/types/movies/TranslationsResponse";
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

const MainTVShowTranslationLayout = async ({
  children,
  params: { id },
}: Props) => {
  const actualId = parseInt(id);

  const queryClient = new QueryClient();

  const apiClientTranslations = new APIClient<TranslationsResponse>(
    RQ_TV_SHOWS_TRANSLATIONS_ENDPOINT(id)
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TV_SHOWS_TRANSLATIONS_KEY, actualId],
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

export default MainTVShowTranslationLayout;
