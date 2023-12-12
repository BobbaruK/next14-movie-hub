import Link from "next/link";

interface Props {
  id: string | number;
}

const MovieNavigation = ({ id }: Props) => {
  return (
    <div className="navbar bg-base-100 flex justify-center align-middle relative z-10">
      <div className="">
        <ul className="menu menu-horizontal px-1 ">
          <li>
            <details>
              <summary>Overview</summary>
              <ul className="p-2  w-48">
                <li>
                  <Link href={`/movie/${id}`}>Main</Link>
                </li>
                <li>
                  <Link href={`/movie/${id}/titles`}>Alternative Titles</Link>
                </li>
                <li>
                  <Link href={`/movie/${id}/cast`}>Cast & Crew</Link>
                </li>
                <li>
                  <Link href={`/movie/${id}/releases`}>Release Dates</Link>
                </li>
                <li>
                  <Link href={`/movie/${id}/translations`}>Translations</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href={`/movie/${id}/images/backdrops`}>Backdrops</Link>
          </li>
          <li>
            <Link href={`/movie/${id}/images/logos`}>Logos</Link>
          </li>
          <li>
            <Link href={`/movie/${id}/images/posters`}>Posters</Link>
          </li>
          <li>
            <Link href={`/movie/${id}/videos`}>Videos</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MovieNavigation;
