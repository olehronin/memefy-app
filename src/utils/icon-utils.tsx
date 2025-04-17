import { ReactElement } from "react";
import { ListIcon, TableIcon } from "@/utils/icons.tsx";


export type IconType = "listIcon" | "tableIcon";

export const getIcon = (icon?: IconType): ReactElement | null => {
    switch (icon) {
        case "listIcon":
            return <ListIcon />;
        case "tableIcon":
            return <TableIcon />;
        default:
            return null;
    }
};