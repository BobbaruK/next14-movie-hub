import { TMDB_Error } from "@/app/types/TMDB_Error";
import { Language } from "@/app/types/movies/Language";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
): Promise<NextResponse<Language[] | TMDB_Error>> {
  const languages: Language[] = await fetch(
    // TODO: error handling to all api routes
    // `https://api.themoviedb.org/3/configuration/languages`
    `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return NextResponse.json(languages);
}
