import { useCallback, useEffect } from "react";
import { useDisclosure } from "@heroui/react";
import Layout from "@/layouts/Layout.tsx";
import TableEditorModal from "@/features/tableview/TableEditorModal.tsx";
import TableRenderer from "@/features/tableview/TableRenderer.tsx";
import { Meme } from "@/types/meme.ts";
import { useMemeData } from "@/features/hooks/useMemeData.ts";
import MemeSortControls from "@/components/MemeSortControls.tsx";

function TablePage() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const {
        memes,
        setMeme, meme,
        patchOne,
        fetchAll,
        isCached,
        isLoading,
        error,
        sortByKey,
        sortOrder,
        setSort,
        setSortOrder
    } = useMemeData();

    useEffect(() => {
        if (!isCached() && !isLoading) {
            fetchAll();
        }
    }, [isCached, fetchAll]);

    const onTableAction = useCallback((element: Meme) => {
        onOpen();
        setMeme(element);
    }, [onOpen]);

    const handleSave = useCallback(async (element: Meme) => {
        if (element) {
            await patchOne(element.id, element).finally(() => onClose());
        }
    }, [patchOne, onClose]);

    return (
        <Layout>
            <section className={"flex flex-col items-center justify-center gap-4 py-4 md:py-8"}>
                <div className={"w-full max-w-[900px]"}>
                    <div className={"px-1 sm:px-2 flex gap-2 items-center justify-end"}>
                        <MemeSortControls
                            sortByKey={sortByKey}
                            sortOrder={sortOrder}
                            onSortChange={setSort}
                            onDirectionChange={setSortOrder}
                        />
                    </div>
                    <div className={"py-2"}>
                        <TableRenderer
                            data={memes}
                            handleEdit={onTableAction}
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                </div>
            </section>
            {meme && (
                <TableEditorModal
                    editingMeme={meme}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    handleSave={handleSave}
                />
            )}
        </Layout>
    );
}

export default TablePage;