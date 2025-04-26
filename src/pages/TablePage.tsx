import {useCallback, useEffect} from "react";
import {useDisclosure} from "@heroui/react";
import Layout from "@/layouts/Layout";
import TableEditorModal from "@/features/table/TableEditorModal.tsx";
import {useMemeData} from "@/features/hooks/useMemeData";
import {DEFAULT_PAGE_SIZE} from "@/utils/PageableBuilder";
import MemeTable from "@/features/table/MemeTable.tsx";
import {Meme} from "@/types/meme.ts";

const TablePage = () => {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
    const {
        meme,
        memes,
        error,
        isLoading,
        pageInfo,
        patchOne,
        isCached,
        setMeme,
        loadPage
    } = useMemeData();

    const loadInitialPage = useCallback(async () => {
        if (!isCached()) {
            await loadPage(pageInfo.number, pageInfo.size || DEFAULT_PAGE_SIZE);
        }
    }, [isCached, loadPage, pageInfo.number, pageInfo.size]);

    useEffect(() => {
        loadInitialPage();
    }, [loadPage]);

    const handleEdit = useCallback((element: Meme) => {
        setMeme(element);
        onOpen();
    }, [setMeme, onOpen]);

    const handleSave = useCallback(async (element: Meme) => {
        if (element) {
            await patchOne(element.id, element).finally(() => onClose());
        }
    }, [patchOne, onClose]);

    return (
        <Layout>
            <section className={"flex flex-col items-center justify-center gap-4 py-4 md:py-8"}>
                <div className={"w-full max-w-[900px]"}>
                    <MemeTable memes={memes} isLoading={isLoading} error={error} onEdit={handleEdit}/>
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
};

export default TablePage;