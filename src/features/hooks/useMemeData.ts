import { useMemeStore } from "@/features/hooks/useMemeStore.ts";

export const useMemeData = () => {
    const memes = useMemeStore((state) => state.memes);
    const meme = useMemeStore((state) => state.meme);
    const fetchAll = useMemeStore((state) => state.fetchAll);
    const patchOne = useMemeStore((state) => state.patchOne);
    const isLoading = useMemeStore((state) => state.isLoading);
    const error = useMemeStore((state) => state.error);
    const setSort = useMemeStore((state) => state.setSortBy);
    const setSortOrder = useMemeStore((state) => state.setSortOrder);
    const sortByKey = useMemeStore((state) => state.sortBy);
    const sortOrder = useMemeStore((state) => state.sortOrder);
    const setMeme = useMemeStore((state) => state.setMeme);
    const isCached = useMemeStore((state) => state.isCached);

    return {
        memes,
        meme,
        fetchAll,
        patchOne,
        isLoading,
        error,
        setSort,
        setSortOrder,
        sortByKey,
        sortOrder,
        setMeme,
        isCached
    };
};
