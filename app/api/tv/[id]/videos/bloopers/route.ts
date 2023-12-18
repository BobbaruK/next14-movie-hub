import { TheVideo, VideosResponse } from "@/app/types/movies/VideoResponse";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<TheVideo[]>> {
  const id = params.id;

  const { results }: VideosResponse = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  const bloopers = results.filter((video) => video.type === "Bloopers");

  return NextResponse.json(bloopers);
}
