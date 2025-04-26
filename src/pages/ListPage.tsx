import {ReactElement, useCallback, useEffect} from "react";
import MemeListView from "@/features/list/MemeListView";
import Layout from "@/layouts/Layout";
import {useMemeData} from "@/features/hooks/useMemeData";
import SortControls from "@/components/SortControls";
import {DEFAULT_PAGE_SIZE} from "@/utils/PageableBuilder.ts";

const MemesPage = (): ReactElement => {
    const {
        memes,
        isLoading,
        error,
        hasMore,
        sortBy,
        sortOrder,
        setSort,
        loadNextPage,
        loadPage,
        isCached,
        pageInfo
    } = useMemeData();

    const loadInitialPage = useCallback(async () => {
        if (!isCached()) {
            await loadPage(pageInfo.number, pageInfo.size || DEFAULT_PAGE_SIZE);
        }
    }, [isCached, loadPage, pageInfo.number, pageInfo.size]);

    useEffect(() => {
        loadInitialPage();
    }, [loadPage]);

    return (
        <Layout>
            <section
                aria-labelledby={"memes-title"}
                className={"flex flex-col items-center justify-center py-4 md:py-8 relative"}
            >
                <h2 id={"memes-title"} className={"sr-only"}>
                    Memes page
                </h2>

                <div className={"w-full flex items-center justify-between"}>
                    <p className={"text-sm sm:text-xl"}>Memes: {memes.length}</p>
                    <SortControls sortBy={sortBy} sortOrder={sortOrder} setSort={setSort}/>
                </div>

                <MemeListView
                    memes={memes}
                    isLoading={isLoading}
                    error={error}
                    loadMore={loadNextPage}
                    hasMore={hasMore}
                />
            </section>
        </Layout>
    );
};

export default MemesPage;
