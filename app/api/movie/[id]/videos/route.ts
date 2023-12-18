import { TheVideo, VideosResponse } from "@/app/types/movies/VideoResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<VideosResponse>> {
  const id = params.id;

  const videos: VideosResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return NextResponse.json(videos);
}
