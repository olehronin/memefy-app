import { SortBy, SortOrder } from "@/types/meme.ts";

export const sortBy = Object.entries(SortBy).map(([key, value]) => ({
    key: value,
    label: key.charAt(0) + key.slice(1).toLowerCase()
}));

export const direction = Object.entries(SortOrder).map(([key, value]) => ({
    key: value,
    label: key.charAt(0) + key.slice(1).toLowerCase()
}));
