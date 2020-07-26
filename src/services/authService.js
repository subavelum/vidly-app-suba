import http from "./httpService";
import { apiUrl } from "../config.json";
import jwt_decode from "jwt-decode";

const apiEndPoint = apiUrl + "/auth";
const tokenKey = "token";
http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export async function loginwithjwt(response) {
  localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
}

export async function logout() {
  await localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwt_decode(jwt);
  } catch (error) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginwithjwt,
};
