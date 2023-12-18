import { Genre, GenreResponse } from "@/app/types/movies/GenreResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
): Promise<NextResponse<Genre[]>> {
  const genres: GenreResponse = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return NextResponse.json(genres.genres);
}
