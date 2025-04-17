import { Button, Snippet, Tooltip } from "@heroui/react";
import { EditIcon } from "@/utils/icons.tsx";
import { MemeData } from "@/types/memeData.ts";
import { Key, ReactNode } from "react";

export interface ColumnConfig<T> {
    key: Key | string;
    label: string;
    render?: (item: T, value: T[keyof T] | null, context: { handleEdit: (item: T) => void }) => ReactNode;
    align?: "start" | "center" | "end";
}

export const getMemeColumns = (): ColumnConfig<MemeData>[] => {
    return [
        {
            key: "id",
            label: "ID",
            render: (_, value) => <span>{value}</span>,
            align: "center"
        },
        {
            key: "name",
            label: "NAME",
            render: (_, value) => (
                <div className="flex w-full">
                    <span className="line-clamp-2">{value}</span>
                </div>
            ),
            align: "start"
        },
        {
            key: "imageUrl",
            label: "IMAGE",
            render: (_, value) => (
                <Snippet
                    symbol={null}
                    className="w-24 sm:w-40 md:w-52 lg:w-full max-w-80"
                    classNames={{ pre: "truncate" }}
                >
                    {value}
                </Snippet>
            ),
            align: "start"
        },
        {
            key: "likes",
            label: "LIKES",
            render: (_, value) => <span>{value}</span>,
            align: "center"
        },
        {
            key: "actions",
            label: "ACTIONS",
            render: (item, _, { handleEdit }) => (
                <div className="relative flex items-center gap-2">
                    <Tooltip color="default" content="Edit meme" delay={500} placement="bottom" showArrow>
                        <Button
                            className="text-base text-default-700 min-w-10 sm:min-w-20 w-10 h-10 sm:w-auto px-0 sm:px-4"
                            onPress={() => handleEdit(item)}
                        >
                            <EditIcon size={20} />
                            <span className="hidden sm:block">Edit</span>
                        </Button>
                    </Tooltip>
                </div>
            ),
            align: "center"
        }
    ];
};
