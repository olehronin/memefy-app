import { SortSelect } from "@/components/SortSelect.tsx";
import { direction, sortBy } from "@/utils/meme-sort.ts";
import { memo } from "react";
import { SortBy, SortOrder } from "@/types/meme.ts";


interface Props {
    sortByKey: SortBy;
    sortOrder: SortOrder;
    onSortChange: (value: SortBy) => void;
    onDirectionChange: (value: SortOrder) => void;
}

const MemeSortControls = memo(({ sortByKey, sortOrder, onSortChange, onDirectionChange }: Props) => (
    <div className={"flex gap-2"}>
        <SortSelect
            label={"Sort By"}
            ariaLabelledby={"Select sorted by"}
            options={sortBy}
            selectedKey={sortByKey}
            onChange={onSortChange}
        />
        <SortSelect
            label={"Direction"}
            ariaLabelledby={"Select direction by"}
            options={direction}
            selectedKey={sortOrder}
            onChange={onDirectionChange}
        />
    </div>
));

MemeSortControls.displayName = "MemeSortControls";

export default MemeSortControls;