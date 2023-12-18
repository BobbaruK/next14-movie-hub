import { CastAndCrew } from "@/app/types/movies/CastAndCrew";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<CastAndCrew>> {
  const id = params.id;

  const castAndCrew: CastAndCrew = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return NextResponse.json(castAndCrew);
}
