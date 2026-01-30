import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1/trpc`;
const TOKEN = await chrome.storage.local.get("READLATER_TOKEN");

const Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN["READLATER_TOKEN"]}`,
  },
});

const ExtAppClient = new QueryClient();

export { Axios, ExtAppClient };
