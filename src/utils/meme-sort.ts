import {SortBy, SortOrder} from "@/types/pageable.ts";

export const sortByOptions = Object.entries(SortBy).map(([key, value]) => ({
    key: value,
    label: key.charAt(0) + key.slice(1).toLowerCase()
}));

export const sortDirectionOptions = Object.entries(SortOrder).map(([key, value]) => ({
    key: value,
    label: key.charAt(0) + key.slice(1).toLowerCase()
}));
