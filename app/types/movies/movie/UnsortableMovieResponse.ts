import { MoviesResponse } from "./MoviesResponse";

interface Dates {
  maximum: string;
  minimum: string;
}

export interface UnsortableMovieResponse extends MoviesResponse {
  dates: Dates;
}
