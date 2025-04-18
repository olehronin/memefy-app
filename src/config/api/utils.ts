import { AxiosError } from "axios";
import { ServerResponseError } from "@/types/apiTypes.ts";

export function handleAxiosError(error: unknown): ServerResponseError {
    if (error instanceof AxiosError) {
        if (error.response) {
            const responseData = error.response.data as ServerResponseError | undefined;
            if (responseData && responseData.message && responseData.code) {
                return {
                    code: responseData.code,
                    message: responseData.message,
                    status: responseData.status || error.response.status.toString(),
                    path: responseData.path || error.response.config.url || "",
                    time: responseData.time || new Date().toISOString()
                };
            }
            return {
                code: error.response.status,
                message: error.response.statusText || "Unexpected server error",
                status: error.response.status.toString(),
                path: error.response.config.url || "",
                time: new Date().toISOString()
            };
        } else if (error.request) {
            return {
                code: 0,
                message: "Network error. Please check your connection.",
                status: "NETWORK_ERROR",
                path: error.config?.url || "",
                time: new Date().toISOString()
            };
        }
    }
    return {
        code: -1,
        message: "An unexpected error occurred",
        status: "UNKNOWN_ERROR",
        path: "",
        time: new Date().toISOString()
    };
}