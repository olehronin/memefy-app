import { IconType } from "@/utils/icon-utils.tsx";

type RouterConfig = {
    name: string;
    navItems: NavItems[];
    navMenuItems: NavItems[];
    externalLinks: ExternalLink[];
};

type ExternalLink = {
    title: string;
    href: string;
    colorClass?: string;
};

type NavItems = {
    label: string;
    href: string;
    icon?: IconType;
}

export const siteConfig: RouterConfig = {
    name: "MemeFy",
    navItems: [
        { label: "Table", href: "/meme-table", icon: "tableIcon" },
        { label: "List", href: "/meme-list", icon: "listIcon" }
    ],
    navMenuItems: [
        { label: "Table", href: "/meme-table", icon: "tableIcon" },
        { label: "List", href: "/meme-list", icon: "listIcon" }
    ],
    externalLinks: [
        { title: "App", href: "https://github.com/olehronin/memefy-app", colorClass: "text-teal-500" },
        { title: "Server", href: "https://github.com/olehronin/memefy-server", colorClass: "text-indigo-500" }
    ]
};
