import MainMovieSection from "@/app/(pages)/MainMovieSection";
import { RQ_MOVIE_KEY } from "@/app/constants";

interface Props {
  params: {
    id: string;
  };
}

interface Props {}

const MoviePage = ({ params: { id } }: Props) => {
  const actualId = parseInt(id);

  return (
    <>
      <h1>Movie: {actualId}</h1>
      <MainMovieSection id={actualId} queryKey={RQ_MOVIE_KEY} />
    </>
  );
};

export default MoviePage;
