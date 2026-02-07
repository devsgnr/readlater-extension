import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1/extension`;

const Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-Extension-ID": `${import.meta.env.VITE_EXTENSION_ID}`,
  },
});

Axios.interceptors.request.use(async (config) => {
  const { READLATER_TOKEN } = await chrome.storage.local.get("READLATER_TOKEN");
  if (READLATER_TOKEN) {
    config.headers.Authorization = `Bearer ${READLATER_TOKEN}`;
  }
  return config;
});

const ExtAppClient = new QueryClient();

export { Axios, ExtAppClient };
