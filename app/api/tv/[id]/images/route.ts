import { TMDB_ImagesResponse } from "@/app/types/movies/ImagesResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<TMDB_ImagesResponse>> {
  const id = params.id;

  const images: TMDB_ImagesResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/images?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return NextResponse.json(images);
}
