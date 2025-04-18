import { memo, ReactElement } from "react";
import { Select, SelectItem } from "@heroui/react";

type OptionItem<T extends string> = {
    key: T;
    label: string;
};

type SortSelectProps<T extends string> = {
    label: string;
    ariaLabelledby?: string,
    options: OptionItem<T>[];
    selectedKey: T;
    onChange: (key: T) => void;
    className?: string;
};

const SortSelectInner = <T extends string>({
                                               label,
                                               ariaLabelledby,
                                               options,
                                               selectedKey,
                                               onChange
                                           }: SortSelectProps<T>): ReactElement => {
    return (
        <Select
            size={"sm"}
            radius={"md"}
            label={label}
            fullWidth={false}
            variant={"underlined"}
            aria-labelledby={ariaLabelledby}
            selectedKeys={[selectedKey]}
            onSelectionChange={(keys) => {
                const key = Array.from(keys)[0] as T;
                onChange(key);
            }}
            disallowEmptySelection={true}
            classNames={{
                base: "min-w-28",
                trigger: "py-0 h-10 min-h-10"
            }}
        >
            {options.map((opt) => (
                <SelectItem key={opt.key}>{opt.label}</SelectItem>
            ))}
        </Select>
    );
};

export const SortSelect = memo(SortSelectInner) as typeof SortSelectInner;
