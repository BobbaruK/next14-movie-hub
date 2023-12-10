import { Movie } from "@/app/types/movies/MoviesResponse";
import ReleaseDateUI from "@/app/utils/releaseDateUI";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const style = {
    "--value": movie.vote_average * 10,
    "--thickness": "3px",
    "--size": "2rem",
  } as React.CSSProperties;

  const { releaseDate } = ReleaseDateUI(movie.release_date);

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt="Shoes"
          className="w-full"
        />
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
        <h2 className="card-title line-clamp-2 m-0" title={movie.title}>
          {movie.title}
        </h2>
        <p className="grow-0">{releaseDate}</p>
      </div>
    </div>
  );
};

export default MovieCard;