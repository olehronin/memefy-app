import { Key, memo, ReactElement, useCallback, useMemo } from "react";
import {
    Button,
    Snippet,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@heroui/react";
import { EditIcon } from "@/utils/icons.tsx";
import { Meme } from "@/types/meme.ts";
import { ServerResponseError } from "@/types/apiTypes.ts";
import ErrorRetryButton from "@/components/ErrorRetryButton.tsx";

type TableRendererProps = {
    data: Meme[];
    handleEdit: (item: Meme) => void;
    isLoading?: boolean;
    error?: ServerResponseError | null;
}

export const columns = [
    { name: "ID", uid: "id", align: "center" },
    { name: "NAME", uid: "name", align: "start" },
    { name: "IMAGE", uid: "imageUrl", align: "start" },
    { name: "LIKE", uid: "likes", align: "center" },
    { name: "ACTIONS", uid: "actions", align: "center" }
];

const TableRenderer = memo(({ data, handleEdit, isLoading, error }: TableRendererProps): ReactElement => {
    const headerColumns = useMemo(() => columns, []);

    const renderCell = useCallback((value: Meme, columnKey: Key) => {
        const cellValue = value[columnKey as keyof Meme];

        switch (columnKey) {
            case "id":
                return <span>{value.id}</span>;
            case "name":
                return (
                    <div className={"flex w-full"}>
                        <span className={"line-clamp-2"}>{value.name}</span>
                    </div>
                );
            case "imageUrl":
                return (
                    <Snippet
                        symbol={null}
                        className={"w-24 sm:w-40 md:w-52 lg:w-full max-w-80"}
                        classNames={{ pre: "truncate" }}
                    >
                        {value.imageUrl}
                    </Snippet>
                );
            case "likes":
                return <span>{value.likes}</span>;
            case "actions":
                return (
                    <div className={"relative flex items-center gap-2"}>
                        <Button
                            aria-labelledby={`Edit row meme with name: ${value.name}`}
                            className={"text-base text-default-700 min-w-10 sm:min-w-20 w-10 h-10 sm:w-auto px-0 sm:px-4"}
                            onPress={() => handleEdit(value)}
                        >
                            <EditIcon size={20} />
                            <span className={"hidden sm:block"}>Edit</span>
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [handleEdit]);

    return (
        <Table
            radius={"lg"}
            isCompact={true}
            fullWidth={true}
            aria-labelledby={"Meme table"}
            classNames={{
                wrapper: "p-2 md:p-4 rounded-2xl md:rounded-3xl",
                td: "px-2 sm:px-3",
                th: "max-w-14 sm:max-w-28 truncate"
            }}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.align as "start" | "center" | "end"}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={data}
                isLoading={isLoading && !error}
                emptyContent={"No elements found"}
                loadingContent={
                    <Spinner
                        size={"lg"}
                        color={"primary"}
                        variant={"spinner"}
                        aria-label={"Loading more..."}
                    />
                }
            >
                {error ? (
                    <TableRow key={"error"}>
                        <TableCell colSpan={columns.length} className="text-center py-4">
                            <ErrorRetryButton error={error} />
                        </TableCell>
                    </TableRow>
                ) : (
                    (item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
    );
});

TableRenderer.displayName = "TableRenderer";

export default TableRenderer;
