import axios, { type CreateAxiosDefaults } from "axios";

import { API_URL } from "@/config/constants.ts";

const options: CreateAxiosDefaults = {
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
};
const apiDefault = axios.create(options);
const apiWithAuth = axios.create(options);

apiWithAuth.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error),
);

apiWithAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error);
    },
);

export { apiDefault, apiWithAuth };
