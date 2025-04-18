import { memo, ReactElement, useCallback } from "react";
import { Button, Card, Image } from "@heroui/react";
import PostActionButton from "@/components/PostActionButton.tsx";
import { Link } from "@heroui/link";
import { Meme } from "@/types/meme.ts";

type PostCardProps = {
    data: Meme;
};

const PostCard = memo(({ data }: PostCardProps): ReactElement => {
    const handleLike = useCallback((liked: boolean) => {
        console.log("Liked:", liked, "Meme ID:", data.id);
    }, [data.id]);

    return (
        <Card radius={"lg"} className={"mb-4 break-inside-avoid rounded-2xl"} title={data.name}>
            <Image
                isBlurred={true}
                alt={data.name}
                src={data.imageUrl}
                className={"w-full"}
                classNames={{ wrapper: "!max-w-none" }}
            />
            <div className={"flex flex-col gap-1 p-2"}>
                <p className={"line-clamp-2"}>{data.name}</p>
                <div className={"flex gap-1 justify-between items-center"}>
                    <PostActionButton
                        count={data.likes}
                        hoverColor={"red-500"}
                        togglesFill={true}
                        onClickAction={handleLike}
                    />
                    <Button
                        as={Link}
                        size={"sm"}
                        target={"_blank"}
                        showAnchorIcon={true}
                        href={data.imageUrl}
                        rel="noopener noreferrer"
                        className={"rounded-[10px] bg-content3 text-sm data-[hover=true]:bg-default"}
                    >
                        View Source
                    </Button>
                </div>
            </div>
        </Card>
    );
});

PostCard.displayName = "PostCard";

export default PostCard;
