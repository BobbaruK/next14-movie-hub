import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React, { ReactNode } from "react";
import APIClient from "../services/tmdbApiClient";
import { TMDB_API_Configuration } from "../types/config";
import { RQ_CONFIG_KEY } from "../constants";

interface Props {
  children: ReactNode;
}

const layout = async ({ children }: Props) => {
  const apiClient = new APIClient<TMDB_API_Configuration>("/configuration");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_CONFIG_KEY],
    queryFn: () => apiClient.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default layout;
