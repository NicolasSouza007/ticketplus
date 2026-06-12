import axios from "axios";

export const api = axios.create({
  baseURL: process.env.AUTH_URL as string,
});
