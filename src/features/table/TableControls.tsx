import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@heroui/react";
import SortControls from "@/components/SortControls.tsx";
import {useMemeData} from "@/features/hooks/useMemeData.ts";
import {memo} from "react";

interface SortControlsProps {
    rowsPerPage: number;
    onRowsPerPageChange: (rows: number) => void;
}

const TableControls = memo(({rowsPerPage, onRowsPerPageChange}: SortControlsProps) => {
    const {sortBy, sortOrder, setSort} = useMemeData();

    return (
        <div className={"px-1 sm:px-2 flex gap-2 items-center justify-end"}>
            <SortControls sortBy={sortBy} sortOrder={sortOrder} setSort={setSort}/>
            <Dropdown placement={"bottom-end"}>
                <DropdownTrigger>
                    <Button variant={"bordered"} color={"default"} size={"md"}>Rows: {rowsPerPage}</Button>
                </DropdownTrigger>
                <DropdownMenu disallowEmptySelection={true} selectedKeys={[rowsPerPage]} selectionMode={"single"}
                              aria-label={"Rows per page"} onAction={(key) => onRowsPerPageChange(Number(key))}>
                    <DropdownItem key={"5"}>5</DropdownItem>
                    <DropdownItem key={"10"}>10</DropdownItem>
                    <DropdownItem key={"15"}>15</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
});

TableControls.displayName = "TableControls";

export default TableControls;
