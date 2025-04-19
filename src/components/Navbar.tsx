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
import { GithubIcon, Logo } from "@/utils/icons.tsx";
import { Button, Divider } from "@heroui/react";

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

type ExternalButtonProps = {
    title: string;
    href: string;
    className?: string;
    isMobile?: boolean;
};

const ExternalLinkButton = ({ title, href, className, isMobile }: ExternalButtonProps) => (
    <Button
        as={Link}
        href={href}
        target={"_blank"}
        rel="noopener noreferrer"
        variant={isMobile ? "flat" : "light"}
        className={clsx("text-base min-w-10 md:min-w-20 px-0 md:px-4 w-full", className)}
        isExternal={true}
        showAnchorIcon={isMobile}
    >
        <GithubIcon />
        <span className={clsx(isMobile ? "block" : "hidden md:block")}>{title}</span>
    </Button>
);

const NavLinks = () => (
    <div className={"hidden sm:flex bg-content1 rounded-2xl border-1 border-default p-1"}>
        {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} className={"flex gap-1 items-center"}>
                <Link
                    className={clsx(
                        linkStyles({ color: "foreground" }),
                        "data-[active=true]:text-base data-[active=true]:font-medium font-normal px-4 pl-3.5 py-1 flex gap-1 hover:bg-content4 rounded-xl"
                    )}
                    color={"foreground"}
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
            {siteConfig.navMenuItems.map((item) => (
                <NavbarMenuItem key={item.href}>
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
        <Divider className={"mt-2"} />
        <div className={"flex flex-row gap-2 my-2"}>
            {siteConfig.externalLinks.map((link) => (
                <ExternalLinkButton
                    key={link.href}
                    isMobile={true}
                    className={link.colorClass}
                    {...link}
                />
            ))}
        </div>
    </NavbarMenu>
);

const Navbar = memo(() => (
    <HeroUINavbar maxWidth={"xl"} position={"sticky"}>
        <NavbarContent>
            <LogoLink />
        </NavbarContent>

        <NavbarContent justify={"center"}>
            <NavLinks />
        </NavbarContent>

        <NavbarContent className={"hidden sm:flex basis-1/5 gap-2"} justify={"end"}>
            {siteConfig.externalLinks.map((link) => (
                <NavbarItem key={link.href}>
                    <ExternalLinkButton {...link} />
                </NavbarItem>
            ))}
            <NavbarItem className={"hidden sm:flex gap-2"}>
                <ThemeSwitch />
            </NavbarItem>
        </NavbarContent>

        <NavbarContent className={"sm:hidden basis-1 pl-4"} justify={"end"}>
            <ThemeSwitch />
            <NavbarMenuToggle className={"w-10"} />
        </NavbarContent>

        <MobileMenu />
    </HeroUINavbar>
));

Navbar.displayName = "Navbar";

export default Navbar;
