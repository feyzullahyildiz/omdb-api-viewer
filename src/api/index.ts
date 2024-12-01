import axios from "axios";

export const api = axios.create({
    baseURL: "https://www.omdbapi.com"
})

api.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        apikey: import.meta.env.VITE_OMDB_API_KEY,
      };
    return config
})