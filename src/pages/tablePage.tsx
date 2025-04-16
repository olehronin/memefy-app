import { useCallback, useState } from "react";
import {
    Button,
    Snippet,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
    useDisclosure
} from "@heroui/react";

import { Meme } from "@/types/meme.ts";
import { EditIcon } from "@/components/icons.tsx";
import DefaultLayout from "@/layouts/default.tsx";
import EditorModal from "@/components/tableComponents/EditorModal.tsx";

export const columns = [
    { name: "ID", uid: "id" },
    { name: "NAME", uid: "name" },
    { name: "IMAGE", uid: "imageUrl" },
    { name: "LIKES", uid: "likes" },
    { name: "ACTIONS", uid: "actions" }
];

export const arrayMemes: Meme[] = [
    {
        id: 1,
        name: "Tony Reichdff ncgbfty njx ",
        likes: 54,
        imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    {
        id: 2,
        name: "Zoey Lang",
        likes: 25,
        imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
        id: 3,
        name: "Tony Reichert",
        likes: 54,
        imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    {
        id: 4,
        name: "Zoey Lang",
        likes: 25,
        imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
        id: 5,
        name: "Tony Reichert",
        likes: 54,
        imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    {
        id: 6,
        name: "Zoey Lang",
        likes: 25,
        imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    }
];

export default function TablePage() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [memes, setMemes] = useState<Meme[]>(arrayMemes);
    const [editingMeme, setEditingMeme] = useState<Meme | null>(null);

    const handleEdit = (meme: Meme) => {
        onOpen();
        setEditingMeme(meme);
    };

    const handleSave = () => {
        onClose();
        if (editingMeme) {
        }
    };

    const renderCell = useCallback((meme: Meme, columnKey: string | number) => {
        const cellValue = meme[columnKey];

        switch (columnKey) {
            case "id":
                return <span>{cellValue}</span>;
            case "name":
                return (
                    <div className={"flex w-full"}>
                        <span className={"truncate w-20 sm:w-48 md:w-52 lg:w-full max-w-96"}>{cellValue}</span>
                    </div>
                );
            case "imageUrl":
                return (
                    <Snippet
                        symbol={null}
                        className={"w-28 sm:w-36 md:w-52 lg:w-full max-w-80"}
                        classNames={{
                            pre: "truncate"
                        }}
                    >
                        {cellValue}
                    </Snippet>
                );
            case "likes":
                return <span>{cellValue}</span>;
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip
                            color={"default"}
                            content="Edit meme"
                            delay={500}
                            placement={"bottom"}
                            showArrow={true}
                        >
                            <Button
                                className={"text-base text-default-700 min-w-10 sm:min-w-20 w-10 h-10 sm:w-auto px-0 sm:px-4"}
                                onPress={() => handleEdit(meme)}
                            >
                                <EditIcon size={20} />
                                <span className={"hidden sm:block"}>Edit</span>
                            </Button>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="p-1 sm:p-4">
                    <Table
                        classNames={{
                            wrapper: "p-2 md:p-4",
                            td: "px-2 sm:px-3",
                            th: " max-w-14 sm:max-w-28 truncate"
                        }}
                        aria-label="Example table with custom cells"
                    >
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn
                                    key={column.uid}
                                    align={
                                        column.uid === "actions"
                                            ? "center"
                                            : "start"
                                    }
                                >
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={memes}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => (
                                        <TableCell>
                                            {renderCell(item, columnKey)}
                                        </TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
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
