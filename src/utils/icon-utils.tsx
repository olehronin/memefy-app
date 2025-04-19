import { ReactElement } from "react";
import { GithubIcon, ListIcon, TableIcon } from "@/utils/icons.tsx";


export type IconType = "listIcon" | "tableIcon" | "gihHubIcon";

export const getIcon = (icon?: IconType): ReactElement | null => {
    switch (icon) {
        case "listIcon":
            return <ListIcon />;
        case "tableIcon":
            return <TableIcon />;
        case "gihHubIcon":
            return <GithubIcon />;
        default:
            return null;
    }
};