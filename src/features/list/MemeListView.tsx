import {memo, ReactElement} from "react";
import PostCard from "@/components/PostCard";
import {Meme} from "@/types/meme";
import {ServerResponseError} from "@/types/apiTypes";
import ErrorRetryButton from "@/components/ErrorRetryButton";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import SpinnerLoader from "@/components/SpinnerLoader.tsx";

interface MemeListViewProps {
    memes: Meme[];
    isLoading: boolean;
    error: ServerResponseError | null;
    loadMore: () => void;
    hasMore: boolean;
}

const BREAKPOINT_COLUMNS = {
    default: 4,
    1024: 3,
    768: 2,
    640: 1,
};

const EndMessage = () => (
    <p className={"text-center my-8 text-md text-indigo-400 font-medium"}>
        Yay! You have seen it all
    </p>
);

const MemeListView = memo(({
                               memes,
                               isLoading,
                               error,
                               loadMore,
                               hasMore
                           }: MemeListViewProps): ReactElement => {
    if (!memes.length && isLoading) {
        return <SpinnerLoader/>
    }

    if (!memes.length && !isLoading) {
        return <div className={"text-center p-4"}>No memes available</div>;
    }

    return (
        <section aria-labelledby={"memes-heading"} className={"w-full"}>
            <h2 id={"memes-heading"} className={"sr-only"}>
                Meme list
            </h2>

            <InfiniteScroll
                dataLength={memes.length}
                next={loadMore}
                hasMore={hasMore}
                loader={!error && <SpinnerLoader/>}
                endMessage={<EndMessage/>}
                className={"w-full"}
            >
                <Masonry
                    breakpointCols={BREAKPOINT_COLUMNS}
                    className={"flex w-full gap-4 py-4"}
                    columnClassName={"flex flex-col gap-4"}
                >
                    {memes.map((meme) => (
                        <PostCard key={meme.id} data={meme}/>
                    ))}
                </Masonry>

                {error && <ErrorRetryButton error={error}/>}
            </InfiniteScroll>
        </section>
    );
});

MemeListView.displayName = "MemeListView";

export default MemeListView;
