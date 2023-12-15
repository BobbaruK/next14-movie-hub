import releaseDateUI from "../utils/releaseDateUI";

const movieMetadataTitle = (
  title: string,
  releaseDate: string,
  page?: string
) => {
  const { year } = releaseDateUI(releaseDate);

  if (page) return `${page} | ${title} (${year})`;

  return `${title} (${year})`;
};

export default movieMetadataTitle;
