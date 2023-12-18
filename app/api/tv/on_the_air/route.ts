import {
  MyTVShowsResponse,
  TVShowsResponse,
} from "@/app/types/movies/tv/TVShowsResponse";
import { NextRequest, NextResponse } from "next/server";

// TODO: maybe sort this by genre and stuff to
export async function GET(
  request: NextRequest
): Promise<NextResponse<MyTVShowsResponse>> {
  const searchParams = request.nextUrl.searchParams;

  const queryPage = searchParams.get("page") || "1";

  const tv: TVShowsResponse = await fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.TMDB_API_KEY}&page=${queryPage}`,
    { headers: {} }
  ).then((res) => res.json());

  return NextResponse.json({
    responseType: "tv-unsortable",
    ...tv,
  });
}
