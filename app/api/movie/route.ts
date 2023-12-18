import {
  MoviesResponse,
  MyMoviesResponse,
} from "@/app/types/movies/movie/MoviesResponse";
import { NextRequest, NextResponse } from "next/server";

// https://api.themoviedb.org/3/discover/movie

export async function GET(
  request: NextRequest
): Promise<NextResponse<MyMoviesResponse>> {
  const searchParams = request.nextUrl.searchParams;

  const queryPage = searchParams.get("page") || "1";
  const genres = searchParams.get("with_genres") || "";

  const movie: MoviesResponse = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&page=${queryPage}&with_genres=${genres}`
  ).then((res) => res.json());

  return NextResponse.json({ responseType: "movies", ...movie });
}
