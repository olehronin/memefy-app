import { ReactElement } from "react";
import Layout from "@/layouts/Layout.tsx";
import { title } from "@/utils/primitives.ts";
import { Link } from "@heroui/link";
import { Button } from "@heroui/react";

import { siteConfig } from "@/config/site";
import { getIcon } from "@/utils/icon-utils";

const MobileNavButtons = () => (
    <div className={"sm:hidden flex items-start mx-auto w-full mt-8"}>
        <ul className={"flex flex-row gap-2 w-full"}>
            {siteConfig.navItems.map((item) => (
                <li key={item.href} className={"flex gap-1 items-center"}>
                    <Button
                        as={Link}
                        href={item.href}
                        size={"lg"}
                        radius={"lg"}
                        variant={"flat"}
                        color={item.label === "Table" ? "primary" : "default"}
                        className={"px-8"}
                    >
                        {getIcon(item.icon)}
                        {item.label}
                    </Button>
                </li>
            ))}
        </ul>
    </div>
);

const IndexPage = (): ReactElement => {
    return (
        <Layout>
            <section className={"flex flex-col items-center justify-center gap-4 py-8 md:py-10"}>
                <div className={"mx-auto px-2"}>
                    <div className={"inline-block max-w-lg sm:text-center text-left justify-center"}>
                        <div>
                            <span className={title({ color: "yellow" })}>Scroll.&nbsp;</span>
                            <span className={title({ color: "violet" })}>Laugh.&nbsp;</span>
                            <span className={title({ color: "yellow" })}>Repeat.&nbsp;</span>
                        </div>
                        <div className={"my-2"}>
                            <p className={"sm:text-lg lg:text-xl text-default-800 mt-6"}>
                                MemeFy is your ultimate destination for the freshest,
                                funniest, and most viral memes on the internet.
                            </p>
                            <p className={"font-medium mt-3 text-lg text-foreground"}>
                                Dive in and let the laughs begin!
                            </p>
                        </div>
                    </div>
                    <MobileNavButtons />
                </div>
            </section>
        </Layout>
    );
};

export default IndexPage;