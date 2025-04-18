import axios, { type CreateAxiosDefaults } from "axios";
import axiosRetry from "axios-retry";
import { API_URL } from "@/config/constants.ts";

const options: CreateAxiosDefaults = {
    baseURL: API_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
};

const apiWithAuth = axios.create(options);

axiosRetry(apiWithAuth, {
    retries: 3,
    retryDelay: (retryCount) => {
        return retryCount * 100 * Math.pow(2, retryCount - 1);
    },
    retryCondition: (error) => {
        return (
            axios.isAxiosError(error) && (!error.response ||
                [429, 500, 502, 503, 504].includes(error.response.status))
        );
    }
});

apiWithAuth.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

apiWithAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error);
    }
);

export { apiWithAuth };
