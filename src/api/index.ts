import axios from "axios";

export const api = axios.create({
    baseURL: "https://www.omdbapi.com"
})

api.interceptors.request.use((config) => {
    config.params = {
        ...config.params,
        apikey: getApiKey(),
      };
    return config
})

const LOCAL_STORAGE_KEY = "omdbApiKey";
function getApiKey() {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    if (apiKey) {
        return apiKey;
    }
    if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
        return localStorage.getItem(LOCAL_STORAGE_KEY);
    }
    const value = window.prompt("Enter your API key");
    if (value) {
        localStorage.setItem(LOCAL_STORAGE_KEY, value);
        return value;
    }
    return null;
}