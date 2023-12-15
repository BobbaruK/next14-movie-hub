import releaseDateUI from "../utils/releaseDateUI";

const useMovieMetadataTitle = (
  title: string,
  releaseDate: string,
  page?: string
) => {
  const { year } = releaseDateUI(releaseDate);

  if (page) return `${page} | ${title} (${year})`;

  return `${title} (${year})`;
};

export default useMovieMetadataTitle;
