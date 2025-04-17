import { ReactElement } from "react";
import Layout from "@/layouts/Layout.tsx";
import { title } from "@/utils/primitives.ts";


const IndexPage = (): ReactElement => {
    return (
        <Layout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <span className={title({ color: "yellow" })}>
                        Scroll.&nbsp;
                    </span>
                    <span className={title({ color: "violet" })}>
                        Laugh.&nbsp;
                    </span>
                    <span className={title({ color: "yellow" })}>
                        Repeat.&nbsp;
                    </span>
                    <div className={"my-2 px-2"}>
                        <p className=" sm:text-lg lg:text-xl text-default-800 block max-w-full mt-6">
                            MemeFy is your ultimate destination for the freshest,
                            funniest, and most viral memes on the internet.
                        </p>
                        <p className={"font-medium mt-3 text-lg text-blue-200"}>Dive in and let the laughs begin!</p>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default IndexPage;