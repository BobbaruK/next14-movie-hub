import { MoviesResponse, MyMoviesResponse } from "@/app/types/movies/movie/MoviesResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
): Promise<NextResponse<MyMoviesResponse>> {
  const searchParams = request.nextUrl.searchParams;

  const queryPage = searchParams.get("page") || "1";

  const movie: MoviesResponse = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&page=${queryPage}`,
    { headers: {} }
  ).then((res) => res.json());

  return NextResponse.json({
    responseType: "movies-unsortable",
    ...movie,
  });
}
