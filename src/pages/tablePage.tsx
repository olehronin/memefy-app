import { useCallback, useState } from "react";
import {
    Button,
    Input,
    Modal,
    ModalContent,
    ModalFooter,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
    useDisclosure,
} from "@heroui/react";

import { Meme } from "@/types/meme.ts";
import { EditIcon } from "@/components/icons.tsx";
import DefaultLayout from "@/layouts/default.tsx";

export const columns = [
    { name: "ID", uid: "id" },
    { name: "NAME", uid: "name" },
    { name: "LIKES", uid: "likes" },
    { name: "IMAGE_URL", uid: "imageUrl" },
    { name: "ACTIONS", uid: "actions" }
];

export const arrayMemes: Meme[] = [
    {
        id: 1,
        name: "Tony Reichert",
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
        id: 1,
        name: "Tony Reichert",
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
        id: 1,
        name: "Tony Reichert",
        likes: 54,
        imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    {
        id: 2,
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
        if (editingMeme) {
        }
    };

    const renderCell = useCallback((meme: Meme, columnKey: string | number) => {
        const cellValue = meme[columnKey];

        switch (columnKey) {
            case "id":
                return <span>{cellValue}</span>;
            case "name":
                return <span>{cellValue}</span>;
            case "imageUrl":
                return <span>{cellValue}</span>;
            case "likes":
                return <span>{cellValue}</span>;
            case "details":
                return (
                    <div>
                        <p>ID: {meme.id}</p>
                        <p>Name: {meme.name}</p>
                        <p>Likes: {meme.likes}</p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Edit user">
                            <Button
                                className={"text-base text-default-600"}
                                onPress={() => handleEdit(meme)}
                            >
                                <EditIcon size={20} />
                                <span>Edit</span>
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

                <div className="p-4">
                    <Table aria-label="Example table with custom cells">
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
                    {editingMeme && (
                        <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
                            <ModalContent>
                                <Input
                                    required
                                    label="Name"
                                    maxLength={100}
                                    minLength={3}
                                    value={editingMeme.name}
                                    onChange={(e) =>
                                        setEditingMeme({
                                            ...editingMeme,
                                            name: e.target.value
                                        })
                                    }
                                />
                                <Input
                                    required
                                    label="Image URL"
                                    type="url"
                                    value={editingMeme.imageUrl}
                                    onChange={(e) =>
                                        setEditingMeme({
                                            ...editingMeme,
                                            imageUrl: e.target.value
                                        })
                                    }
                                />
                            </ModalContent>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleSave}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </Modal>
                    )}
                </div>
            </section>
        </DefaultLayout>
    );
}
