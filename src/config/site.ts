import { IconType } from "@/components/navbar.tsx";

export type SiteConfig = typeof siteConfig;

type RouterConfig = {
    name: string;
    navItems: NavItems[];
    navMenuItems: NavItems[];
};

type NavItems = {
    label: string;
    href: string;
    icon?: IconType;
}

export const siteConfig: RouterConfig = {
    name: "MemeFy",
    navItems: [
        {
            label: "List",
            href: "/meme-list",
            icon: "listIcon"
        },
        {
            label: "Table",
            href: "/meme-table",
            icon: "tableIcon"
        }
    ],
    navMenuItems: [
        {
            label: "List",
            href: "/meme-list",
            icon: "listIcon"
        },
        {
            label: "Table",
            href: "/meme-table",
            icon: "tableIcon"
        }
    ]
};
