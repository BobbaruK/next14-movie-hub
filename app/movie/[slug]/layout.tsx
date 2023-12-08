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
    <div>
      <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
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
      {children}
    </div>
  );
};

export default MovieLayout;
