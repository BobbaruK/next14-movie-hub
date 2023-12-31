import { RQ_CONFIG_KEY } from "@/app/constants";
import { TMDB_API_Configuration } from "@/app/types/TMDB_API_Configuration";
import { Movie } from "@/app/types/movies/movie/MoviesResponse";
import { TVShow } from "@/app/types/movies/tv/TVShowsResponse";
import instanceOf from "@/app/utils/instanceOf";
import ReleaseDateUI from "@/app/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { TMDBImage } from "../../client/TMDBImage";
import { PosterSizes } from "@/app/types/imageSizes";

interface Props {
  movie: Movie | TVShow;
}

const MovieCard = ({ movie }: Props) => {
  const style = {
    "--value": movie.vote_average * 10,
    "--thickness": "3px",
    "--size": "2rem",
  } as React.CSSProperties;

  const { data: config } = useQuery<TMDB_API_Configuration>({
    queryKey: [RQ_CONFIG_KEY],
  });

  // console.log(config?.images.secure_base_url);

  const instanceOfMovie = instanceOf<Movie>(movie);

  const title = instanceOfMovie ? movie.title : movie.name;

  const { releaseDate } = ReleaseDateUI(
    instanceOfMovie ? movie.release_date : movie.first_air_date
  );

  const link = instanceOfMovie ? `/movie/${movie.id}` : `/tv/${movie.id}`;

  return (
    <div className="card bg-base-100 shadow-md shadow-primary">
      <figure>
        <Link href={link} className="w-full">
          <TMDBImage
            alt={title}
            path={movie.poster_path}
            type="posters"
            width={348}
            height={521}
            sizes="(min-width: 1280px) 219px, (min-width: 1040px) calc(25vw - 24px), (min-width: 780px) calc(33.33vw - 19px), (min-width: 640px) calc(50vw - 22px), calc(100vw - 32px)"
            size={PosterSizes.w342}
          />
          {/* <img
            className="max-w-full sm:h-72 object-cover"
            src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
            alt={title}
            width={3840}
            height={2160}
            loading="lazy"
          /> */}
        </Link>
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
          <Link href={link}>{title}</Link>
        </h2>
        <p className="grow-0">{releaseDate}</p>
      </div>
    </div>
  );
};

export default MovieCard;
