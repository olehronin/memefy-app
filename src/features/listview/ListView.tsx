import { memo, ReactElement } from "react";
import PostCard from "@/components/PostCard.tsx";
import { Meme } from "@/types/meme.ts";
import { ServerResponseError } from "@/types/apiTypes.ts";
import { Spinner } from "@heroui/react";
import ErrorRetryButton from "@/components/ErrorRetryButton.tsx";

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
        return <ErrorRetryButton error={error} />;
    }

    if (!elements.length) {
        return <div className={"text-center p-4"}>No memes available</div>;
    }

    return (
        <div className={"columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 py-4 [column-fill:_balance] w-full"}>
            {elements.map((meme) => (
                <PostCard key={meme.id} data={meme} />
            ))}
        </div>
    );
});

ListView.displayName = "ListView";

export default ListView;
