import { ReactNode } from "react";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
                {children}
            </main>
            <footer className="w-full flex gap-4 items-center justify-center py-3">
                <div className={"flex"}>
                    <span className="text-default-600">Meme</span>
                    <p className="text-primary">Fy</p>
                </div>
                <span className={"text-base text-default-600"}>2025</span>
            </footer>
        </div>
    );
}
