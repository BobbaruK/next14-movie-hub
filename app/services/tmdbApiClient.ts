import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.TMDB_API_KEY,
    // api_key: TMDB_API_KEY,
  },
});

class APIClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance.get<T>(this.endpoint, config).then((res) => res.data);
  };

  // getMovie = (idEndpoint: string) => {
  //   return axiosInstance
  //     .get<T>(this.endpoint + idEndpoint)
  //     .then((res) => res.data);
  // };

  // searchMovie = (searhQuery: string) => {
  //   return axiosInstance
  //     .get<T>(this.endpoint + "?query=" + searhQuery)
  //     .then((res) => res.data);
  // };
}

export default APIClient;
