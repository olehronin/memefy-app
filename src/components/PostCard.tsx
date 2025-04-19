import { memo, ReactElement, SyntheticEvent, useCallback, useMemo, useState } from "react";
import { Button, Card, Image } from "@heroui/react";
import PostActionButton from "@/components/PostActionButton.tsx";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Meme } from "@/types/meme.ts";

type PostCardProps = {
    data: Meme;
};

const ImageWithLoader = ({ src, alt }: { src: string; alt: string }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = useMemo(() => (e: SyntheticEvent<HTMLImageElement>) => {
        setIsLoading(e.type !== "load");
    }, []);

    return (
        <Image
            alt={alt}
            src={src}
            isBlurred={true}
            onLoad={handleLoad}
            className={clsx("w-full", isLoading ? "h-96" : "h-auto")}
            classNames={{ wrapper: "!max-w-none" }}
        />
    );
};

const ViewSourceButton = ({ href }: { href: string }) => (
    <Button
        as={Link}
        size="sm"
        target="_blank"
        rel="noopener noreferrer"
        showAnchorIcon
        href={href}
        className="rounded-[10px] bg-content3 text-sm data-[hover=true]:bg-default"
    >
        View Source
    </Button>
);

const PostCard = memo(({ data }: PostCardProps): ReactElement => {
    const handleLike = useCallback((liked: boolean) => {
        console.log("Liked:", liked, "Meme ID:", data.id);
    }, [data.id]);

    return (
        <Card
            radius={"lg"}
            fullWidth={true}
            title={data.name}
            className={"mb-4 break-inside-avoid rounded-2xl"}
        >
            <ImageWithLoader src={data.imageUrl} alt={data.name} />

            <div className={"flex flex-col gap-1 p-2"}>
                <p className={"line-clamp-2"}>{data.name}</p>

                <div className={"flex gap-1 justify-between items-center"}>
                    <PostActionButton
                        count={data.likes}
                        hoverColor={"red-500"}
                        togglesFill={true}
                        onClickAction={handleLike}
                    />
                    <ViewSourceButton href={data.imageUrl} />
                </div>
            </div>
        </Card>
    );
});

PostCard.displayName = "PostCard";

export default PostCard;
