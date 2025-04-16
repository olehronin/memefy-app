import { AxiosError } from "axios";
import { ServerResponseError } from "@/types/apiTypes.ts";

export function handleAxiosError(error: unknown): ServerResponseError {
    if (error instanceof AxiosError && error.response) {
        return error.response.data;
    }
    throw error;
}
