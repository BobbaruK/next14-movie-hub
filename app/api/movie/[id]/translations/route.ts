import {
  TMDB_TranslationsResponse,
  TranslationMovie,
} from "@/app/types/movies/TranslationsResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<TMDB_TranslationsResponse<TranslationMovie>>> {
  const id = params.id;

  const translations: TMDB_TranslationsResponse<TranslationMovie> = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/translations?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return NextResponse.json(translations);
}
