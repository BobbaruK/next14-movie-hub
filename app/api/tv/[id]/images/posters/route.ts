import { TMDB_API_Configuration } from "@/app/types/TMDB_API_Configuration";
import {
  MyImagesResponse,
  TMDB_ImagesResponse,
} from "@/app/types/movies/ImagesResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<MyImagesResponse>> {
  const id = params.id;

  const { posters }: TMDB_ImagesResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/images?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  const config: TMDB_API_Configuration = await fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return NextResponse.json({
    sizes: config.images.poster_sizes,
    images: posters,
  });
}
