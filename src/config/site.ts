import { IconType } from "@/utils/icon-utils.tsx";

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
            label: "Table",
            href: "/meme-table",
            icon: "tableIcon"
        },
        {
            label: "List",
            href: "/meme-list",
            icon: "listIcon"
        }
    ],
    navMenuItems: [
        {
            label: "Table",
            href: "/meme-table",
            icon: "tableIcon"
        },
        {
            label: "List",
            href: "/meme-list",
            icon: "listIcon"
        },
        {
            label: "GitHub App",
            href: "https://github.com/olehronin/memefy-app",
            icon: "gihHubIcon"
        },
        {
            label: "GitHub Server",
            href: "https://github.com/olehronin/memefy-server",
            icon: "gihHubIcon"
        }
    ]
};
