import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "3af2480834b678e3323531f1a6354d94",
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

  getMovie = (idEndpoint: string) => {
    return axiosInstance
      .get<T>(this.endpoint + idEndpoint)
      .then((res) => res.data);
  };

  searchMovie = (searhQuery: string) => {
    return axiosInstance
      .get<T>(this.endpoint + "?query=" + searhQuery)
      .then((res) => res.data);
  };
}

export default APIClient;
