import { MovieResponse } from "@/app/types/movies/movie/MovieResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<MovieResponse>> {
  const id = params.id;

  const movie: MovieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return NextResponse.json(movie);
}
