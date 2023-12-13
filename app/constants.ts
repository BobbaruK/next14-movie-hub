export const STALE_TIME = 24 * 60 * 60 * 1000; // 24 hours

// Config
export const RQ_CONFIG_KEY = "config";
export const RQ_CONFIG_ENDPOINT = "/configuration";

// Movies
export const RQ_POPULAR_MOVIES_KEY = "popular-movies";
export const RQ_POPULAR_MOVIES_ENDPOINT = "/discover/movie";

export const RQ_NOW_PLAYING_MOVIES_KEY = "now_playing-movies";
export const RQ_NOW_PLAYING_MOVIES_ENDPOINT = "/movie/now_playing";

export const RQ_TOP_RATED_MOVIES_KEY = "top_rated-movies";
export const RQ_TOP_RATED_MOVIES_ENDPOINT = "/movie/top_rated";

export const RQ_UPCOMING_MOVIES_KEY = "upcoming-movies";
export const RQ_UPCOMING_MOVIES_ENDPOINT = "/movie/upcoming";

// TV shows
export const RQ_POPULAR_TVSHOWS_KEY = "popular-tvshows";
export const RQ_POPULAR_TVSHOWS_ENDPOINT = "/discover/tv";

export const RQ_AIRING_TODAY_TVSHOWS_KEY = "airing_today-tvshows";
export const RQ_AIRING_TODAY_TVSHOWS_ENDPOINT = "/tv/airing_today";

export const RQ_ON_THE_AIR_TVSHOW_KEY = "on_the_air-tvshows";
export const RQ_ON_THE_AIR_TVSHOW_ENDPOINT = "/tv/on_the_air";

export const RQ_TOP_RATED_TVSHOWS_KEY = "top_rated-tvshows";
export const RQ_TOP_RATED_TVSHOWS_ENDPOINT = "/tv/top_rated";

// Movie
export const RQ_MOVIE_KEY = "movie";
export const RQ_MOVIE_ENDPOINT = (id: string) => `/movie/${id}`;

// TV Show
export const RQ_TVSHOW_KEY = "tvshow";
export const RQ_TVSHOW_ENDPOINT = "/tv/";

// Images
export const RQ_IMAGES_KEY = "images";
export const RQ_IMAGES_ENDPOINT = (id: string) => `movie/${id}/images`;

// Languages
export const RQ_LANGUAGES_KEY = "languages";
export const RQ_LANGUAGES_ENDPOINT = "/configuration/languages";
