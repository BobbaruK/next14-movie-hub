import {
  EpisodeGroup,
  TMDB_EpisodesGroups,
} from "@/app/types/movies/tv/EpisodesGroup";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<EpisodeGroup[]>> {
  const id = params.id;

  const { results }: TMDB_EpisodesGroups = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/episode_groups?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return NextResponse.json(results);
}
