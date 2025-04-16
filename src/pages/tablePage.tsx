import { useCallback, useEffect, useMemo, useState } from "react";
import { useDisclosure } from "@heroui/react";
import { MemeData } from "@/types/memeData.ts";
import DefaultLayout from "@/layouts/default.tsx";
import EditorModal from "@/components/tableComponents/EditorModal.tsx";
import { useMemeStore } from "@/features/meme/useMemeStore.ts";
import TableViewer from "@/components/tableComponents/TableViewer.tsx";
import { getMemeColumns } from "@/components/tableComponents/ColumnConfig.tsx";

export default function TablePage() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const isLoading = useMemeStore((state) => state.isLoading);
    const error = useMemeStore((state) => state.error);
    const memes = useMemeStore((state) => state.memes);

    const fetchMany = useMemeStore((state) => state.fetchMany);
    const patchOne = useMemeStore((state) => state.patchOne);

    const columns = useMemo(() => getMemeColumns(), []);
    const [editingMeme, setEditingMeme] = useState<MemeData | null>(null);

    useEffect(() => {
        if (!memes.length && !isLoading) {
            fetchMany({ page: 0, size: 10 });
        }
    }, [memes.length, fetchMany, isLoading]);

    const handleEdit = useCallback((meme: MemeData) => {
        onOpen();
        setEditingMeme(meme);
    }, [onOpen]);

    const handleSave = async () => {
        if (editingMeme) {
            await patchOne(editingMeme.id, editingMeme);
            onClose();
        }
    };

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="p-1 sm:p-4 w-full max-w-[900px]">
                    {error ? (
                        <div className="text-red-500">Error: {error?.message || "An error occurred"}</div>
                    ) : (
                        <TableViewer<MemeData>
                            data={memes}
                            columns={columns}
                            handleEdit={handleEdit}
                            isLoading={isLoading}
                        />
                    )}
                </div>
            </section>
            {editingMeme && (
                <EditorModal
                    editingMeme={editingMeme}
                    handleSave={handleSave}
                    isOpen={isOpen}
                    setEditingMeme={setEditingMeme}
                    onClose={onClose}
                    onOpen={onOpen}
                />
            )}
        </DefaultLayout>
    );
}
