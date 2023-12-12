import { Movie } from "@/app/types/movies/MoviesResponse";
import { TVShow } from "@/app/types/tv/TVShowsResponse";
import ReleaseDateUI from "@/app/utils/releaseDateUI";
import { TMDBImage } from "../../TMDBImage";

interface Props {
  movie: Movie | TVShow;
}

const MovieCard = ({ movie }: Props) => {
  const style = {
    "--value": movie.vote_average * 10,
    "--thickness": "3px",
    "--size": "2rem",
  } as React.CSSProperties;

  const instanceOfMovie = (object: any): object is Movie => {
    return "title" in object;
  };

  const title = instanceOfMovie(movie) ? movie.title : movie.name;

  const { releaseDate } = ReleaseDateUI(
    instanceOfMovie(movie) ? movie.release_date : movie.first_air_date
  );

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <TMDBImage alt={title} path={movie.poster_path} />
      </figure>
      <div className="card-body p-4 flex justify-between relative pt-7">
        <div
          className={[
            `${
              movie.vote_average > 7.5
                ? "voteGood"
                : movie.vote_average > 6.0
                ? "voteOk"
                : "voteBad"
            }`,
            "radial-progress",

            "absolute",
            "-top-5",

            "bg-slate-900",
            "border-2",
            "border-slate-100",
            "text-sm",
          ].join(" ")}
          style={style}
          role="progressbar">
          {movie.vote_average.toFixed(1)}
        </div>
        <h2 className="card-title line-clamp-2 m-0" title={title}>
          {title}
        </h2>
        <p className="grow-0">{releaseDate}</p>
      </div>
    </div>
  );
};

export default MovieCard;
