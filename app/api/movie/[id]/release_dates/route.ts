import { ReleaseDates } from "@/app/types/movies/movie/ReleaseDates";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ReleaseDates>> {
  const id = params.id;

  const releaseDates: ReleaseDates = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return NextResponse.json(releaseDates);
}
