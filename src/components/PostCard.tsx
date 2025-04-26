import {memo, ReactElement, useCallback} from "react";
import {Button, Card, Image, Link} from "@heroui/react";
import PostActionButton from "@/components/PostActionButton.tsx";
import {Meme} from "@/types/meme.ts";

interface PostCardProps {
    data: Meme;
};

const ImageWithLoader = memo(({src, alt}: { src: string; alt: string }) => {
    return (
        <Image
            alt={alt}
            src={src}
            isBlurred={true}
            className={"w-full"}
            classNames={{wrapper: "!max-w-none"}}
        />
    );
});

ImageWithLoader.displayName = "ImageWithLoader";

const ViewSourceButton = ({href}: { href: string }) => (
    <Button
        as={Link}
        size={"sm"}
        href={href}
        target={"_blank"}
        showAnchorIcon={true}
        rel="noopener noreferrer"
        className={"rounded-[10px] bg-content3 text-sm data-[hover=true]:bg-default"}
    >
        View Source
    </Button>
);

const PostCard = memo(({data}: PostCardProps): ReactElement => {
    const handleLike = useCallback((liked: boolean) => {
        console.log("Liked:", liked, "Meme ID:", data.id);
    }, [data.id]);

    return (
        <Card
            radius={"lg"}
            fullWidth={true}
            title={data.name}
            className={"break-inside-avoid rounded-2xl"}
        >
            <ImageWithLoader src={data.imageUrl} alt={data.name}/>

            <div className={"flex flex-col gap-1 p-2"}>
                <p className={"line-clamp-2"}>{data.name}</p>

                <div className={"flex gap-1 justify-between items-center"}>
                    <PostActionButton
                        count={data.likes}
                        hoverColor={"red-500"}
                        togglesFill={true}
                        onClickAction={handleLike}
                    />
                    <ViewSourceButton href={data.imageUrl}/>
                </div>
            </div>
        </Card>
    );
});

PostCard.displayName = "PostCard";

export default PostCard;
