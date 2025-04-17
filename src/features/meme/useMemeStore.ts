import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { MemeData } from "@/types/memeData";
import { ServerResponse, ServerResponseError } from "@/types/apiTypes";
import { apiWithAuth } from "@/config/api";
import { handleAxiosError } from "@/config/api/utils";

interface MemeStoreState {
    meme: MemeData | null;
    memes: MemeData[];
    isLoading: boolean;
    isUseJpg: boolean;
    message: string | null;
    error: ServerResponseError | null;
}

interface MemeStoreActions {
    fetchOne: (id: number) => Promise<void>;
    fetchAll: (useImg: boolean) => Promise<void>;
    patchOne: (id: number, patchData: Partial<MemeData>) => Promise<ServerResponse<MemeData>>;
    toggleUseJpg: (value?: boolean) => void;
    clearStore: () => void;
}

type MemeStore = MemeStoreState & MemeStoreActions;

const initialState: MemeStoreState = {
    meme: null,
    memes: [],
    isLoading: false,
    isUseJpg: true,
    message: null,
    error: null
};

export const useMemeStore = create<MemeStore>()(
    devtools(persist(
        (set) => ({
            ...initialState,

            fetchOne: async (id: number) => {
                set((state) => ({
                    ...state,
                    isLoading: true,
                    error: null
                }));
                try {
                    const response = await apiWithAuth.get<ServerResponse<MemeData>>(`/memes/${id}`);
                    const newMeme = response.data.data;
                    set((state) => ({
                        ...state,
                        meme: newMeme,
                        memes: state.memes.some((m) => m.id === newMeme.id)
                            ? state.memes.map((m) => (m.id === newMeme.id ? newMeme : m))
                            : [...state.memes, newMeme],
                        isLoading: false
                    }));
                } catch (error) {
                    set((state) => ({
                        ...state,
                        isLoading: false,
                        error: handleAxiosError(error)
                    }));
                }
            },

            fetchAll: async (useImg: boolean) => {
                set((state) => ({
                    ...state,
                    isLoading: true,
                    error: null
                }));
                try {
                    const response = await apiWithAuth.get<ServerResponse<MemeData[]>>("/memes", {
                        params: { useImg: useImg }
                    });
                    set((state) => ({
                        ...state,
                        memes: response.data.data,
                        isLoading: false
                    }));
                } catch (error) {

                    set((state) => ({
                        ...state,
                        isLoading: false,
                        error: handleAxiosError(error)
                    }));
                }
            },

            patchOne: async (id: number, patchData: Partial<MemeData>) => {
                set((state) => ({
                    ...state,
                    isLoading: true,
                    error: null
                }));
                try {
                    const response = await apiWithAuth.patch<ServerResponse<MemeData>>(
                        `/memes/${id}`,
                        patchData
                    );
                    const updatedMeme = response.data.data;
                    set((state) => ({
                        memes: state.memes.map((m) => (m.id === updatedMeme.id ? updatedMeme : m)),
                        meme: state.meme?.id === updatedMeme.id ? updatedMeme : state.meme
                    }));
                    return response.data;
                } catch (error) {
                    set((state) => ({
                        ...state,
                        isLoading: false,
                        error: handleAxiosError(error)
                    }));
                    throw handleAxiosError(error);
                }
            },

            toggleUseJpg: (value?: boolean) => {
                set((state) => ({
                    isUseJpg: value ?? !state.isUseJpg
                }));
            },

            clearStore: () => set(initialState)
        }), {
            name: "meme-mode",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ isUseJpg: state.isUseJpg })
        })
    )
);