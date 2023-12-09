import { Movie } from "@/app/types/movie";

interface Props {
  movie: Movie;
}

const Card = ({ movie }: Props) => {
  const style = {
    "--value": movie.vote_average * 10,
    "--thickness": "3px",
  } as React.CSSProperties;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt="Shoes"
        />
      </figure>
      <div className="card-body p-4 flex justify-between relative pt-7">
        <div
          className={[
            "radial-progress",

            "w-9",
            "h-9",
            "absolute",
            "-top-5",

            "bg-black",
            `text-${
              movie.vote_average > 7.5
                ? "success"
                : movie.vote_average > 6.0
                ? "warning"
                : "error"
            }`,
            "border-2",
            "border-primary",
            "text-sm",
          ].join(" ")}
          style={style}
          role="progressbar">
          {movie.vote_average}
        </div>
        <h2 className="card-title line-clamp-2 m-0">{movie.title}</h2>
        <p className="grow-0">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default Card;