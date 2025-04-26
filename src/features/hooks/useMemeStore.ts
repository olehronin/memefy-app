import {create} from "zustand";
import {Meme} from "@/types/meme.ts";
import {addToast} from "@heroui/react";
import {devtools} from "zustand/middleware";
import {ServerResponse, ServerResponseError} from "@/types/apiTypes.ts";
import {apiWithAuth} from "@/config/api/api.ts";
import {handleAxiosError} from "@/config/api/utils.ts";
import {Pageable, PageableResponse, SortBy, SortOrder} from "@/types/pageable.ts";
import {DEFAULT_PAGE_SIZE, PageableBuilder} from "@/utils/PageableBuilder.ts";

interface MemeStoreState {
    meme: Meme | null;
    memes: Meme[];
    sortBy: SortBy;
    sortOrder: SortOrder;
    pageInfo: Pageable;
    hasMore: boolean;
    isLoading: boolean;
    error: ServerResponseError | null;
}

interface MemeStoreActions {
    setMeme: (meme: Meme | null) => void;
    fetchAll: (pageable: PageableBuilder) => Promise<void>;
    patchOne: (id: number, patchData: Partial<Meme>) => Promise<ServerResponse<Meme>>;
    setSort: (sortBy: SortBy, sortOrder: SortOrder) => void;
    clearStore: () => void;
    getPageableBuilder: (page?: number, size?: number, sortByOverride?: SortBy, sortOrderOverride?: SortOrder) => PageableBuilder;
}

type MemeStore = MemeStoreState & MemeStoreActions;

const initialState: MemeStoreState = {
    meme: null,
    memes: [],
    sortBy: SortBy.ID,
    sortOrder: SortOrder.ASC,
    pageInfo: {totalPages: 0, size: 0, number: 0, totalElements: 0},
    hasMore: true,
    isLoading: false,
    error: null
};

export const useMemeStore = create<MemeStore>()(
    devtools((set, get) => ({
        ...initialState,
        setMeme: (meme) => set({meme}),
        fetchAll: async (pageable: PageableBuilder): Promise<void> => {
            set({isLoading: true, error: null});
            try {
                const response = await apiWithAuth.get<ServerResponse<PageableResponse<Meme>>>("/memes", {
                    params: pageable.toParams(),
                });
                set((state) => ({
                    memes: pageable.page > state.pageInfo.number ? [...state.memes, ...response.data.data.content] : response.data.data.content,
                    pageInfo: response.data.data.page,
                    hasMore: response.data.data.page.number + 1 < response.data.data.page.totalPages,
                    isLoading: false,
                }));
            } catch (error) {
                const axiosError = handleAxiosError(error);
                set({isLoading: false, error: axiosError});
                addToast({title: axiosError.message, color: "danger"});
            }
        },
        patchOne: async (id: number, patchData: Partial<Meme>) => {
            set({isLoading: true, error: null});
            try {
                const response = await apiWithAuth.patch<ServerResponse<Meme>>(`/memes/${id}`, patchData);
                const updatedMeme = response.data.data;
                set((state) => ({
                    memes: state.memes.map((m) => (m.id === updatedMeme.id ? updatedMeme : m)),
                    meme: state.meme?.id === updatedMeme.id ? updatedMeme : state.meme,
                    isLoading: false,
                }));
                addToast({title: response.data.message, color: "success"});
                return response.data;
            } catch (error) {
                const axiosError = handleAxiosError(error);
                set({isLoading: false, error: axiosError});
                addToast({title: axiosError.message, color: "danger"});
                throw axiosError;
            }
        },
        setSort: (sortBy: SortBy, sortOrder: SortOrder): void => {
            set((state) => ({
                sortBy,
                sortOrder,
                pageInfo: {...state.pageInfo, number: 0},
                memes: [],
            }));
            const pageable = new PageableBuilder({
                page: 0,
                size: get().pageInfo.size,
                sort: {by: sortBy, order: sortOrder},
            });
            get().fetchAll(pageable);
        },
        getPageableBuilder: (
            page = get().pageInfo.number,
            size = get().pageInfo.size || DEFAULT_PAGE_SIZE,
            sortByOverride,
            sortOrderOverride
        ) => {
            return new PageableBuilder({
                page,
                size,
                sort: {
                    by: sortByOverride || get().sortBy,
                    order: sortOrderOverride || get().sortOrder,
                },
            });
        },
        clearStore: () => set(initialState),
    }))
);