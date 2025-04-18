import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Meme, SortBy, SortOrder } from "@/types/meme.ts";
import { ServerResponse, ServerResponseError } from "@/types/apiTypes.ts";
import { apiWithAuth } from "@/config/api";
import { handleAxiosError } from "@/config/api/utils.ts";
import { PageableResponse } from "@/features/pageable.ts";
import { addToast } from "@heroui/react";

interface MemeStoreState {
    meme: Meme | null;
    memes: Meme[];
    sortBy: SortBy;
    sortOrder: SortOrder;
    isLoading: boolean;
    message: string | null;
    error: ServerResponseError | null;
}

interface MemeStoreActions {
    setMeme: (meme: Meme) => void;
    fetchOne: (id: number) => Promise<void>;
    fetchAll: (sortBy?: SortBy, direction?: SortOrder) => Promise<void>;
    patchOne: (id: number, patchData: Partial<Meme>) => Promise<ServerResponse<Meme>>;
    clearStore: () => void;
    setSortBy: (key: SortBy) => void;
    setSortOrder: (key: SortOrder) => void;
}

type MemeStore = MemeStoreState & MemeStoreActions;

const initialState: MemeStoreState = {
    meme: null,
    memes: [],
    sortBy: SortBy.NAME,
    sortOrder: SortOrder.ASC,
    isLoading: false,
    message: null,
    error: null
};

export const useMemeStore = create<MemeStore>()(
    devtools(
        (set, get) => ({
            ...initialState,
            setMeme: (meme: Meme) => {
                set((state) => ({
                    ...state,
                    meme: meme
                }));
            },
            fetchAll: async (sortBy?: SortBy, direction?: SortOrder) => {
                const state = get();
                const by = sortBy ?? state.sortBy;
                const sortDirection = direction ?? state.sortOrder;

                set({ isLoading: true, error: null });

                try {
                    const response = await apiWithAuth.get<ServerResponse<PageableResponse<Meme>>>("/memes", {
                        params: { sortBy: by, direction: sortDirection }
                    });

                    set({
                        memes: response.data.data.content,
                        isLoading: false
                    });
                } catch (error) {
                    set({
                        isLoading: false,
                        error: handleAxiosError(error)
                    });
                }
            },
            patchOne: async (id: number, patchData: Partial<Meme>) => {
                set((state) => ({
                    ...state,
                    isLoading: true,
                    error: null
                }));
                try {
                    const response = await apiWithAuth.patch<ServerResponse<Meme>>(
                        `/memes/${id}`,
                        patchData
                    );
                    const updatedMeme = response.data.data;
                    set((state) => ({
                        memes: state.memes.map((m) => (m.id === updatedMeme.id ? updatedMeme : m)),
                        meme: state.meme?.id === updatedMeme.id ? updatedMeme : state.meme,
                        isLoading: false,
                        error: null
                    }));
                    addToast({ title: response.data.message, color: "success" });
                    return response.data;
                } catch (err) {
                    const error = handleAxiosError(err);
                    set((state) => ({
                        ...state,
                        isLoading: false,
                        error: error
                    }));
                    addToast({ title: error.message, color: "danger" });
                    throw error;
                }
            },


            setSortBy: (key: SortBy) => {
                set({ sortBy: key });
                get().fetchAll();
            },

            setSortOrder: (key: SortOrder) => {
                set({ sortOrder: key });
                get().fetchAll();
            },
            clearStore: () => set(initialState)

        })
    )
);