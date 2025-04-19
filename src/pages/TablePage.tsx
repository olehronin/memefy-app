import { useCallback, useEffect } from "react";
import { useDisclosure } from "@heroui/react";
import Layout from "@/layouts/Layout.tsx";
import TableEditorModal from "@/features/tableview/TableEditorModal.tsx";
import { useMemeStore } from "@/features/useMemeStore.ts";
import TableRenderer from "@/features/tableview/TableRenderer.tsx";
import { Meme } from "@/types/meme.ts";

function TablePage() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const meme = useMemeStore((state) => state.meme);
    const memes = useMemeStore((state) => state.memes);

    const setMeme = useMemeStore((state) => state.setMeme);
    const fetchAll = useMemeStore((state) => state.fetchAll);
    const patchOne = useMemeStore((state) => state.patchOne);
    const isLoading = useMemeStore((state) => state.isLoading);
    const error = useMemeStore((state) => state.error);
    const isCached = useMemeStore((state) => state.isCached);

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
            <section className={"flex flex-col items-center justify-center gap-4 py-8 md:py-10"}>
                <div className={"p-1 sm:p-4 w-full max-w-[900px]"}>
                    <TableRenderer
                        data={memes}
                        handleEdit={onTableAction}
                        isLoading={isLoading}
                        error={error}
                    />
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