import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: {
    slug: number;
  };
}

const MovieLayout = ({ children, params: { slug } }: Props) => {
  return (
    <>
      <div className="navbar bg-base-100 flex justify-center align-middle ">
        <div className="navbar-center ">
          <ul className="menu menu-horizontal px-1 ">
            <li>
              <details>
                <summary>Overview</summary>
                <ul className="p-2">
                  <li>
                    <Link href={`/movie/${slug}`}>Main</Link>
                  </li>
                  <li>
                    <Link href={`/movie/${slug}/titles`}>
                      Alternative Titles
                    </Link>
                  </li>
                  <li>
                    <Link href={`/movie/${slug}/cast`}>Cast & Crew</Link>
                  </li>
                  <li>
                    <Link href={`/movie/${slug}/releases`}>Release Dates</Link>
                  </li>
                  <li>
                    <Link href={`/movie/${slug}/translations`}>
                      Translations
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link href={`/movie/${slug}/images/backdrops`}>Backdrops</Link>
            </li>
            <li>
              <Link href={`/movie/${slug}/images/logos`}>Logos</Link>
            </li>
            <li>
              <Link href={`/movie/${slug}/images/posters`}>Posters</Link>
            </li>
            <li>
              <Link href={`/movie/${slug}/videos`}>Videos</Link>
            </li>
          </ul>
        </div>
      </div>
      {children}
    </>
  );
};

export default MovieLayout;
