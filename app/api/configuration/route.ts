import { TMDB_API_Configuration } from "@/app/types/TMDB_API_Configuration";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
): Promise<NextResponse<TMDB_API_Configuration>> {
  const configuration: TMDB_API_Configuration = await fetch(
    // TODO: error handling to all api routes
    // `https://api.themoviedb.org/3/configuration/languages`
    `https://api.themoviedb.org/3/configuration?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return NextResponse.json(configuration);
}
