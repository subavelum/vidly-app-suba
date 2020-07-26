import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndPoint = apiUrl + "/genres";

export function getGenres() {
  return http.get(apiEndPoint).then((genres) => genres.data);
}
