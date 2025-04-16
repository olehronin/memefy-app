import { ReactElement, useMemo } from "react";
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { ColumnConfig } from "@/components/tableComponents/ColumnConfig.tsx";

interface TableViewerProps<T> {
    data: T[];
    columns: ColumnConfig<T>[];
    handleEdit: (item: T) => void;
    isLoading?: boolean;
}

const TableViewer = <T, >({ data, columns, handleEdit, isLoading }: TableViewerProps<T>): ReactElement => {

    const columnMap = useMemo(() => {
        const map = new Map<string, ColumnConfig<T>>();
        columns.forEach(col => map.set(String(col.key), col));
        return map;
    }, [columns]);

    return (
        <Table
            fullWidth={true}
            radius={"lg"}
            classNames={{
                wrapper: "p-2 md:p-4 rounded-2xl md:rounded-3xl",
                td: "px-2 sm:px-3",
                th: "max-w-14 sm:max-w-28 truncate"
            }}
            aria-label="Dynamic table"
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key} align={column.align || "start"}>
                        {column.label}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={data}
                isLoading={isLoading}
                loadingContent={
                    <Spinner
                        size={"lg"}
                        color={"primary"}
                        variant={"spinner"}
                        aria-label={"Loading more..."}
                    />
                }
                emptyContent={"No rows to display."}
            >
                {(item) => (
                    <TableRow key={(item as any).id}>
                        {(columnKey) => {
                            const column = columnMap.get(columnKey.toString());
                            if (!column) return (
                                <TableCell>
                                    <></>
                                </TableCell>
                            );
                            const value =
                                column.key !== "actions" && column.key
                                    ? item[column.key as keyof T]
                                    : null;
                            return (
                                <TableCell>
                                    {column.render
                                        ? column.render(item, value, { handleEdit })
                                        : value?.toString() ?? ""}
                                </TableCell>
                            );
                        }}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

TableViewer.displayName = "TableViewer";

export default TableViewer;
