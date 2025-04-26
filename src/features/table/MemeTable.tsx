import {Key, memo, useCallback, useMemo, useState} from "react";
import {
    Button,
    Pagination,
    Snippet,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@heroui/react";
import {EditIcon} from "@/utils/icons.tsx";
import {Meme} from "@/types/meme.ts";
import {ServerResponseError} from "@/types/apiTypes.ts";
import ErrorRetryButton from "@/components/ErrorRetryButton.tsx";
import TableControls from "@/features/table/TableControls.tsx";
import {columns} from "@/features/table/utils.ts";
import SpinnerLoader from "@/components/SpinnerLoader.tsx";

interface MemeTableProps {
    memes: Meme[];
    isLoading?: boolean;
    error?: ServerResponseError | null;
    onEdit: (meme: Meme) => void;
}

interface TablePaginationProps {
    page: number;
    pages: number;
    setPage: (page: number) => void;
}

const TablePagination = ({page, pages, setPage}: TablePaginationProps) => (
    <div className="py-0 px-0 flex justify-center items-center">
        <Pagination
            page={page}
            color={"default"}
            variant={"light"}
            total={pages}
            showControls={true}
            onChange={setPage}
            classNames={{cursor: "bg-foreground text-background"}}
        />
    </div>
);

const MemeTable = memo(({memes, isLoading, error, onEdit}: MemeTableProps) => {
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [page, setPage] = useState<number>(1);

    const pages = Math.ceil(memes.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return memes.slice(start, start + rowsPerPage);
    }, [page, memes, rowsPerPage]);

    const renderCell = useCallback((meme: Meme, columnKey: Key) => {
        const cellValue = meme[columnKey as keyof Meme];
        switch (columnKey) {
            case "id":
                return <span>{meme.id}</span>;
            case "name":
                return <span className={"line-clamp-2"}>{meme.name}</span>;
            case "imageUrl":
                return (
                    <Snippet symbol={null} className={"w-24 sm:w-40 md:w-52 lg:w-full max-w-80"}
                             classNames={{pre: "truncate"}}>
                        {meme.imageUrl}
                    </Snippet>
                );
            case "likes":
                return <span>{meme.likes}</span>;
            case "actions":
                return (
                    <Button
                        aria-labelledby={`Edit row meme with name: ${meme.name}`}
                        className={"text-base text-default-700 min-w-10 sm:min-w-20 w-10 h-10 sm:w-auto px-0 sm:px-4"}
                        onPress={() => onEdit(meme)}
                    >
                        <EditIcon size={20}/>
                        <span className={"hidden sm:block"}>Edit</span>
                    </Button>
                );
            default:
                return cellValue;
        }
    }, [onEdit]);

    return (
        <Table
            radius={"lg"}
            isCompact={true}
            topContentPlacement={"outside"}
            bottomContentPlacement={"outside"}
            aria-labelledby={"Meme table"}
            classNames={{
                base: "gap-3",
                wrapper: "p-2 md:p-4 rounded-2xl md:rounded-3xl",
                td: "px-2 sm:px-3",
                th: "max-w-14 sm:max-w-28 truncate"
            }}
            topContent={
                <TableControls
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={setRowsPerPage}
                />
            }
            bottomContent={
                <TablePagination
                    page={page}
                    pages={pages}
                    setPage={setPage}/>
            }
        >
            <TableHeader columns={columns}>
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
                items={items}
                isLoading={isLoading && !error}
                emptyContent={"No elements found"}
                loadingContent={<SpinnerLoader/>}
            >
                {error ? (
                    <TableRow key={"error"}>
                        <TableCell colSpan={columns.length} className={"text-center py-4"}>
                            <ErrorRetryButton error={error}/>
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

MemeTable.displayName = "MemeTable";

export default MemeTable;
