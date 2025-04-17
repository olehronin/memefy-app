import { memo } from "react";
import clsx from "clsx";
import { Link } from "@heroui/link";
import {
    Navbar as HeroUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { getIcon } from "@/utils/icon-utils.tsx";
import ThemeSwitch from "@/components/ThemeSwitch.tsx";
import { Logo } from "@/utils/icons.tsx";

const LogoLink = () => (
    <NavbarBrand className={"gap-3 max-w-fit"}>
        <Link
            className={"flex justify-start items-center gap-1"}
            color={"foreground"}
            href={"/"}
        >
            <Logo />
            <p className={"font-bold text-inherit"}>MemeFy</p>
        </Link>
    </NavbarBrand>
);

const NavLinks = () => (
    <div className="hidden sm:flex bg-content1 rounded-2xl border-1 border-default p-1">
        {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} className={"flex gap-1 items-center"}>
                <Link
                    className={clsx(
                        linkStyles({ color: "foreground" }),
                        "data-[active=true]:text-base data-[active=true]:font-medium font-normal px-4 pl-3.5 py-1 flex gap-1 hover:bg-content4 rounded-xl"
                    )}
                    color="foreground"
                    href={item.href}
                >
                    {getIcon(item.icon)}
                    {item.label}
                </Link>
            </NavbarItem>
        ))}
    </div>
);

const MobileMenu = () => (
    <NavbarMenu>
        <div className={"mt-2 flex flex-col gap-2"}>
            {siteConfig.navMenuItems.map((item, index) => (
                <NavbarMenuItem key={`${item.href}-${index}`}>
                    <Link
                        className={"w-full flex gap-2 bg-content1 px-4 py-2 rounded-xl"}
                        color={"foreground"}
                        href={item.href}
                        size={"lg"}
                    >
                        {getIcon(item.icon)}
                        {item.label}
                    </Link>
                </NavbarMenuItem>
            ))}
        </div>
    </NavbarMenu>
);

const Navbar = memo(() => {
    return (
        <HeroUINavbar maxWidth="xl" position="sticky">
            <NavbarContent>
                <LogoLink />
            </NavbarContent>

            <NavbarContent justify="center">
                <NavLinks />
            </NavbarContent>

            <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem className="hidden sm:flex gap-2">
                    <ThemeSwitch />
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <ThemeSwitch />
                <NavbarMenuToggle className="w-10" />
            </NavbarContent>

            <MobileMenu />
        </HeroUINavbar>
    );
});

Navbar.displayName = "Navbar";

export default Navbar;
