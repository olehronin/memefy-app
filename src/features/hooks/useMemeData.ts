import {useCallback} from "react";
import {useMemeStore} from "@/features/hooks/useMemeStore";
import {DEFAULT_PAGE_SIZE} from "@/utils/PageableBuilder.ts";
import {SortBy, SortOrder} from "@/types/pageable.ts";

export const useMemeData = () => {
    const {
        meme,
        memes,
        sortBy,
        sortOrder,
        pageInfo,
        hasMore,
        isLoading,
        error,
        setMeme,
        fetchAll,
        patchOne,
        setSort,
        clearStore,
        getPageableBuilder,
    } = useMemeStore();

    const isCached = useCallback(() => memes.length > 0, [memes]);

    const loadPage = useCallback(async (
        page = 0,
        size = DEFAULT_PAGE_SIZE,
        sortBy = SortBy.ID,
        order = SortOrder.ASC
    ) => {
        const pageableBuilder = getPageableBuilder(page, size, sortBy, order);

        await fetchAll(pageableBuilder);
    }, [fetchAll, getPageableBuilder]);

    const loadNextPage = useCallback(async () => {
        if (isLoading || !hasMore) return;
        const nextPage = pageInfo.number + 1;
        await loadPage(nextPage, pageInfo.size || DEFAULT_PAGE_SIZE);
    }, [isLoading, hasMore, pageInfo, loadPage]);

    return {
        meme,
        memes,
        sortBy,
        sortOrder,
        pageInfo,
        hasMore,
        isLoading,
        error,
        isCached,
        setMeme,
        fetchAll,
        patchOne,
        loadNextPage,
        setSort,
        clearStore,
        getPageableBuilder,
        loadPage,
    };
};
