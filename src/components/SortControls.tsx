import {SortSelect} from "@/components/SortSelect.tsx";
import {sortByOptions, sortDirectionOptions} from "@/utils/meme-sort.ts";
import {memo} from "react";
import {SortBy, SortOrder} from "@/types/pageable.ts";

interface SortControlsProps {
    sortBy: SortBy;
    sortOrder: SortOrder;
    setSort: (sortBy: SortBy, sortOrder: SortOrder) => void;
}

const SortControls = memo(({sortBy, sortOrder, setSort}: SortControlsProps) => {
    return (
        <div className={"flex gap-2"}>
            <SortSelect
                label={"Sort By"}
                ariaLabelledby={"Select sorted by"}
                options={sortByOptions}
                selectedKey={sortBy}
                onChange={(key) => setSort(key, sortOrder)}
            />
            <SortSelect
                label={"Direction"}
                ariaLabelledby={"Select direction by"}
                options={sortDirectionOptions}
                selectedKey={sortOrder}
                onChange={(key) => setSort(sortBy, key)}
            />
        </div>
    )
});

SortControls.displayName = "SortControls";

export default SortControls;