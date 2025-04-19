import { ReactElement, useEffect } from "react";
import ListView from "@/features/listview/ListView.tsx";
import Layout from "@/layouts/Layout";
import { useMemeData } from "@/features/hooks/useMemeData.ts";
import MemeSortControls from "@/components/MemeSortControls.tsx";

const ListPage = (): ReactElement => {
    const {
        memes,
        fetchAll,
        isLoading,
        error,
        sortByKey,
        sortOrder,
        setSort,
        setSortOrder,
        isCached
    } = useMemeData();

    useEffect(() => {
        if (!isCached() && !isLoading) {
            fetchAll();
        }
    }, [isCached, fetchAll]);

    return (
        <Layout>
            <section className={"flex flex-col items-center justify-center py-4 md:py-8 relative"}>
                <div className={"w-full flex items-center justify-between"}>
                    <h1 className={"text-sm sm:text-xl"}>Memes: {memes.length}</h1>
                    <MemeSortControls
                        sortByKey={sortByKey}
                        sortOrder={sortOrder}
                        onSortChange={setSort}
                        onDirectionChange={setSortOrder}
                    />
                </div>
                <ListView elements={memes} isLoading={isLoading} error={error} />
            </section>
        </Layout>
    );
};

export default ListPage;
