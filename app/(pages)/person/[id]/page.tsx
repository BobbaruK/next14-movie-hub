import { People } from "@/app/types/people/PeoplesResponse";
import { Metadata } from "next";

interface Props {
  params: {
    id: number | string;
  };
}

export async function generateMetadata({
  // parent: ResolvingMetadata
  params: { id },
}: Props): Promise<Metadata> {
  const person: People = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}`
  ).then((res) => res.json());

  return {
    title: person.name,
  };
}

const PersonPage = ({ params: { id } }: Props) => {
  return <div>PersonPage: {id}</div>;
};

export default PersonPage;
