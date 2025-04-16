import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives.ts";

export default function IndexPage() {
    return (
        <DefaultLayout>
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
                    <span
                        className={
                            "w-full md:w-full my-2 text-lg lg:text-xl text-default-600 block max-w-full mt-6"
                        }
                    >
                        Memefy is your ultimate destination for the freshest,
                        funniest, and most viral memes on the internet. Dive in
                        and let the laughs begin!
                    </span>
                </div>
            </section>
        </DefaultLayout>
    );
}
