import { memo, ReactElement } from "react";
import PostCard from "@/components/PostCard.tsx";
import { Meme } from "@/types/meme.ts";
import { ServerResponseError } from "@/types/apiTypes.ts";
import { Button, Spinner } from "@heroui/react";
import { useMemeStore } from "@/features/useMemeStore.ts";

type ListViewProps = {
    elements: Meme[];
    isLoading: boolean;
    error: ServerResponseError | null;
};

const ListView = memo(({ elements, isLoading, error }: ListViewProps): ReactElement => {
    if (isLoading) {
        return <Spinner variant={"spinner"} size={"lg"} aria-label={"Loading..."} />;
    }
    if (error) {
        return (
            <div className={"flex flex-col gap-2 text-red-500 text-center p-4"}>
                Error: {error.message || "Failed to load memes"}
                <Button onPress={() => useMemeStore.getState().fetchAll()}>
                    Try Again
                </Button>
            </div>
        );
    }

    if (!elements.length) {
        return <div className={"text-center p-4"}>No memes available</div>;
    }

    return (
        <div className={"columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 py-4 [column-fill:_balance]"}>
            {elements.map((meme) => (
                <PostCard key={meme.id} data={meme} />
            ))}
        </div>
    );
});

ListView.displayName = "ListView";

export default ListView;
