import { ReactElement, useEffect } from "react";
import ListView from "@/features/listview/ListView.tsx";
import Layout from "@/layouts/Layout";
import { useMemeStore } from "@/features/useMemeStore.ts";
import { direction, sortBy } from "@/utils/meme-sort.ts";
import { SortSelect } from "@/components/SortSelect.tsx";

const ListPage = (): ReactElement => {
    const memes = useMemeStore((state) => state.memes);
    const fetchAll = useMemeStore((state) => state.fetchAll);
    const isLoading = useMemeStore((state) => state.isLoading);
    const error = useMemeStore((state) => state.error);

    const setSort = useMemeStore((state) => state.setSortBy);
    const setSortOrder = useMemeStore((state) => state.setSortOrder);
    const sortByKey = useMemeStore((state) => state.sortBy);
    const sortOrder = useMemeStore((state) => state.sortOrder);
    const isCached = useMemeStore((state) => state.isCached);

    useEffect(() => {
        if (!isCached() && !isLoading) {
            fetchAll();
        }
    }, [isCached, fetchAll]);

    return (
        <Layout>
            <section className={"flex flex-col items-center justify-center gap-4 py-8 md:py-10 relative"}>
                <div className={"w-full flex items-center justify-between"}>
                    <h1 className={"text-sm sm:text-xl"}>Memes: {memes.length}</h1>
                    <div className={"flex gap-2"}>
                        <SortSelect
                            label={"Sort By"}
                            ariaLabelledby={"Select sorted by"}
                            options={sortBy}
                            selectedKey={sortByKey}
                            onChange={setSort}
                        />
                        <SortSelect
                            label={"Direction"}
                            ariaLabelledby={"Select direction by"}
                            options={direction}
                            selectedKey={sortOrder}
                            onChange={setSortOrder}
                        />
                    </div>
                </div>

                <ListView elements={memes} isLoading={isLoading} error={error} />
            </section>
        </Layout>
    );
};

export default ListPage;
