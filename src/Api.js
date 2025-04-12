/* eslint-disable no-unused-vars */
// src/api.js
import axios from "axios";

const LOCAL_URL = import.meta.env.VITE_LOCAL_API_URL;
const LIVE_URL = import.meta.env.VITE_LIVE_API_URL;

const api = axios.create({
  baseURL: LOCAL_URL,
});

const checkBackend = async () => {
  try {
    await api.get("/ping");
  } catch (err) {
    console.warn("Local backend not available. Switching to live.");
    api.defaults.baseURL = LIVE_URL;
  }
};

checkBackend();

export default api;
