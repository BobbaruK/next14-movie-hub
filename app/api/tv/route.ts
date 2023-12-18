import {
  MyTVShowsResponse,
  TVShowsResponse,
} from "@/app/types/movies/tv/TVShowsResponse";
import { NextRequest, NextResponse } from "next/server";

// https://api.themoviedb.org/3/discover/movie

export async function GET(
  request: NextRequest
): Promise<NextResponse<MyTVShowsResponse>> {
  const searchParams = request.nextUrl.searchParams;

  const queryPage = searchParams.get("page") || "1";
  const genres = searchParams.get("with_genres") || "";

  const tv: TVShowsResponse = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&page=${queryPage}&with_genres=${genres}`
  ).then((res) => res.json());

  return NextResponse.json({
    responseType: "tv",
    ...tv,
  });
}
