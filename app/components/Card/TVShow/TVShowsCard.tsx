import { TVShow } from "@/app/types/tv/TVShowsResponse";
import ReleaseDateUI from "@/app/utils/releaseDateUI";
import { TMDBImage } from "../../TMDBImage";

interface Props {
  tvShow: TVShow;
}

const TVShowsCard = ({ tvShow }: Props) => {
  const style = {
    "--value": tvShow.vote_average * 10,
    "--thickness": "3px",
    "--size": "2rem",
  } as React.CSSProperties;

  const { releaseDate } = ReleaseDateUI(tvShow.first_air_date);

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <TMDBImage alt={tvShow.name} path={tvShow.poster_path} />
      </figure>
      <div className="card-body p-4 flex justify-between relative pt-7">
        <div
          className={[
            `${
              tvShow.vote_average > 7.5
                ? "voteGood"
                : tvShow.vote_average > 6.0
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
          {tvShow.vote_average.toFixed(1)}
        </div>
        <h2 className="card-title line-clamp-2 m-0" title={tvShow.name}>
          {tvShow.name}
        </h2>
        <p className="grow-0">{releaseDate}</p>
      </div>
    </div>
  );
};

export default TVShowsCard;
