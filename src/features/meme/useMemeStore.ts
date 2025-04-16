import { devtools } from "zustand/middleware";
import { create } from "zustand/react";
import { MemeData } from "@/types/memeData.ts";
import { ServerResponse, ServerResponseError } from "@/types/apiTypes.ts";
import { PageableRequest, PageableResponse } from "@/types/pageable.ts";
import { apiWithAuth } from "@/config/api";
import { handleAxiosError } from "@/config/api/utils.ts";

const initialState = {
    meme: null,
    memes: [],
    isLoading: false,
    message: null,
    error: null
};

export type MemeStoreTypes = {
    meme: MemeData | null;
    memes: MemeData[];
    isLoading: boolean;
    message: string | null;
    error: ServerResponseError | null;

    fetchOne: (id: number) => Promise<void>;
    fetchMany: (pageable: PageableRequest) => Promise<void>;
    patchOne: (id: number, patchData: MemeData) => Promise<ServerResponse<MemeData>>;

    clearStore: () => void;
};

export const useMemeStore = create<MemeStoreTypes>()(
    devtools((set) => ({
            ...initialState,
            fetchOne: async (id: number) => {
                set((state) => ({
                    ...state,
                    isLoading: true
                }));
                try {
                    const response = await apiWithAuth.get<ServerResponse<MemeData>>(`/memes/${id}`);
                    set((state) => {
                        const newMeme = response.data.data;
                        const existingIndex = state.memes.findIndex((m) => m.id === newMeme.id);
                        let updatedMemes = [...state.memes];
                        if (existingIndex !== -1) {
                            updatedMemes[existingIndex] = newMeme;
                        } else {
                            updatedMemes.push(newMeme);
                        }
                        return {
                            meme: newMeme,
                            memes: updatedMemes,
                            isLoading: false
                        };
                    });
                } catch (error) {
                    set((state) => ({
                        ...state,
                        isLoading: false,
                        error: handleAxiosError(error)
                    }));
                }
            },
            patchOne: async (id: number, patchData: MemeData): Promise<ServerResponse<MemeData>> => {
                try {
                    const response = await apiWithAuth.patch<ServerResponse<MemeData>>(`/memes/${id}`, patchData);
                    set((state) => ({
                        memes: { ...state.memes, [response.data.data.id]: response.data.data }
                    }));
                    return response.data;
                } catch (error) {
                    throw handleAxiosError(error);
                }
            },
            fetchMany: async (pageable: PageableRequest) => {
                set(state => ({
                    ...state,
                    isLoading: true,
                    error: null
                }));
                try {
                    const response = await apiWithAuth.get<ServerResponse<PageableResponse<MemeData>>>(
                        "/memes/pageable",
                        { params: pageable }
                    );
                    set(state => {
                        const fetchedMemes = response.data.data.content;
                        if (pageable.page === 0) {
                            return {
                                ...state,
                                memes: fetchedMemes,
                                isLoading: false
                            };
                        } else {
                            const updatedMemes = [...state.memes];
                            fetchedMemes.forEach(newPoll => {
                                const existingIndex = updatedMemes.findIndex(p => p.id === newPoll.id);
                                if (existingIndex !== -1) {
                                    updatedMemes[existingIndex] = newPoll;
                                } else {
                                    updatedMemes.push(newPoll);
                                }
                            });
                            return {
                                ...state,
                                memes: updatedMemes,
                                isLoading: false
                            };
                        }
                    });
                } catch (error) {
                    set(state => ({
                        ...state,
                        isLoading: false,
                        error: handleAxiosError(error)
                    }));
                }
            },
            clearStore: () => {
                set({ ...initialState });
            }
        })
    )
);