import {
  MoviesResponse,
  MyMoviesResponse,
} from "@/app/types/movies/movie/MoviesResponse";
import { NextRequest, NextResponse } from "next/server";

// https://api.themoviedb.org/3/discover/movie

export async function GET(
  request: NextRequest
): Promise<NextResponse<MyMoviesResponse>> {
  const searchParams = request.nextUrl.searchParams;

  console.log("searchParams", searchParams.get("page"));

  const page = searchParams.get("page") || "1";

  const alttest = new URLSearchParams([
    ["page", page],
    ["sange", "sdad"],
  ]);
  // console.log(alttest);

  const movie: MoviesResponse = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      process.env.TMDB_API_KEY
    }&page=${alttest.get("page")}`,
    { headers: {} }
  ).then((res) => res.json());

  return NextResponse.json({
    responseType: "movies",
    ...movie,
  });
}

// import type { NextApiRequest, NextApiResponse } from "next";

// type ResponseData = {
//   message: string;
// };

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   if (req.method === "GET") {
//     res.status(200).json({ message: "Hello from Next.js!" });
//   }
// }
