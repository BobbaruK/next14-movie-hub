import Link from "next/link";

interface Props {
  id: string | number;
}

const TVShowNavigation = ({ id }: Props) => {
  return (
    <div className="navbar bg-base-100 flex justify-center align-middle relative z-10">
      <div className="navbar-center ">
        <ul className="menu menu-horizontal px-1 ">
          <li>
            <details>
              <summary>Overview</summary>
              <ul className="p-2 w-48">
                <li>
                  <Link href={`/tv/${id}`}>Main</Link>
                </li>
                <li>
                  <Link href={`/tv/${id}/titles`}>Alternative Titles</Link>
                </li>
                <li>
                  <Link href={`/tv/${id}/cast`}>Cast & Crew</Link>
                </li>
                <li>
                  <Link href={`/tv/${id}/episode-groups`}>Episode Groups</Link>
                </li>
                <li>
                  <Link href={`/tv/${id}/seasons`}>Seasons</Link>
                </li>
                <li>
                  <Link href={`/tv/${id}/translations`}>Translations</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href={`/tv/${id}/images/backdrops`}>Backdrops</Link>
          </li>
          <li>
            <Link href={`/tv/${id}/images/logos`}>Logos</Link>
          </li>
          <li>
            <Link href={`/tv/${id}/images/posters`}>Posters</Link>
          </li>
          <li>
            <Link href={`/tv/${id}/videos`}>Videos</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TVShowNavigation;
