import { ReactNode } from "react";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
                {children}
            </main>
            <footer
                className="w-full flex gap-2 bg-content1 border-t-1 border-content4 items-center justify-center py-3">
                <div className={"flex"}>
                    <span className="text-foreground-600">Meme</span>
                    <p className="text-indigo-400 font-medium">Fy</p>
                </div>
                <span>&middot;</span>
                <span className={"text-base text-foreground-600"}>2025</span>
            </footer>
        </div>
    );
}
