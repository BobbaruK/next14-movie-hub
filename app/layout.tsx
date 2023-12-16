import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReactQueryProvider from "./ReactQueryProvider";
import { Header } from "./components/Header";
import {
  RQ_CONFIG_ENDPOINT,
  RQ_CONFIG_KEY,
  RQ_LANGUAGES_ENDPOINT,
  RQ_LANGUAGES_KEY,
} from "./constants";
import "./globals.css";
import APIClient from "./services/tmdbApiClient";
import { TMDB_API_Configuration } from "./types/TMDB_API_Configuration";
import { ConfigErrorToast } from "./components/client/ConfigErrorToast";
import { Language } from "./types/movies/Language";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  description: "A simple movie hub app based on the themoviedb.org api's",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  const apiClientConfig = new APIClient<TMDB_API_Configuration>(
    RQ_CONFIG_ENDPOINT
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_CONFIG_KEY],
    queryFn: () => apiClientConfig.getAll(),
  });

  const apiClientLanguages = new APIClient<Language[]>(RQ_LANGUAGES_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_LANGUAGES_KEY],
    queryFn: () => apiClientLanguages.getAll(),
  });

  return (
    <html lang="en" data-theme="halloween">
      <body className={inter.className}>
        <ReactQueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Header />
            <main>{children}</main>
            <ConfigErrorToast />
          </HydrationBoundary>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
