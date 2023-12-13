import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReactQueryProvider from "./ReactQueryProvider";
import { Header } from "./components/Header";
import { RQ_CONFIG_ENDPOINT, RQ_CONFIG_KEY } from "./constants";
import "./globals.css";
import APIClient from "./services/tmdbApiClient";
import { TMDB_API_Configuration } from "./types/TMDB_API_Configuration";
import { ConfigErrorToast } from "./components/ConfigErrorToast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiClient = new APIClient<TMDB_API_Configuration>(RQ_CONFIG_ENDPOINT);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [RQ_CONFIG_KEY],
    queryFn: () => apiClient.getAll(),
  });

  return (
    <html lang="en" data-theme="luxury">
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
