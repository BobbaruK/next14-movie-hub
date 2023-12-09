import { Card } from "@/app/components/Card";
import useMovies from "@/app/hooks/useMovies";



const PopularMoviePage = async () => {
  const movies = await useMovies();

  return (
    <>
      <div className="appContaier">
        <h1>Popular movies</h1>
      </div>
      <div className="appContaier flex flex-col lg:flex-row gap-8">
        <div className="lg:basis-1/4">
          <h2>Sorting</h2>
          <h2>Filtering</h2>
          <h3>Genre(s)</h3>
          <h3>Language</h3>
        </div>
        <div className="lg:basis-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {movies?.results?.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularMoviePage;
