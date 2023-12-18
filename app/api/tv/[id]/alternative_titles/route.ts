import { MovieAlternativeTitles } from "@/app/types/movies/movie/MovieAlternativeTitles";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<MovieAlternativeTitles>> {
  const id = params.id;

  const alternativeTitles: MovieAlternativeTitles = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/alternative_titles?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return NextResponse.json(alternativeTitles);
}
