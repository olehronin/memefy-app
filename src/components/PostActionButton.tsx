import { FC, memo, useMemo, useState } from "react";
import { Button } from "@heroui/react";
import { ThumbUpIcon } from "@/utils/icons.tsx";
import clsx from "clsx";

type ActionButtonProps = {
    count?: number;
    hoverColor?: keyof typeof hoverColorMap;
    togglesFill?: boolean;
    onClickAction?: (liked: boolean) => void;
};

const hoverColorMap = {
    "red-500": "text-red-500 bg-red-500/10",
    "blue-500": "text-blue-500 bg-blue-500/10",
    "default-900": "text-default-900 bg-default-900/10"
};

const PostActionButton: FC<ActionButtonProps> = memo(({
                                                          count = 0,
                                                          hoverColor = "default-900",
                                                          togglesFill = false,
                                                          onClickAction
                                                      }) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [localCount, setLocalCount] = useState<number>(count);
    const [prevCount, setPrevCount] = useState<number>(count);

    const animationDirection = useMemo(() => {
        if (localCount > prevCount) return "up";
        if (localCount < prevCount) return "down";
        return null;
    }, [localCount, prevCount]);

    const handleClick = () => {
        setPrevCount(localCount);

        const nextActive = !isActive;
        setIsActive(nextActive);

        setLocalCount((prev) => nextActive ? prev + 1 : prev - 1);

        if (onClickAction) {
            onClickAction(nextActive);
        }
    };

    return (
        <Button
            variant="light"
            size="sm"
            radius="md"
            onPress={handleClick}
            className={clsx(
                "text-default-800 rounded-[10px] text-sm data-[hover=true]:bg-content1 transition-colors duration-200",
                isActive && togglesFill && hoverColorMap[hoverColor]
            )}
        >
            <ThumbUpIcon
                width={20}
                height={20}
                fill={isActive && togglesFill ? "currentColor" : "none"}
            />
            <span
                key={localCount}
                className={clsx(
                    "inline-block font-bold transition-transform duration-300 ease-out",
                    animationDirection === "up" && "animate-count-up",
                    animationDirection === "down" && "animate-count-down"
                )}
            >
                {localCount}
            </span>
        </Button>
    );
});

PostActionButton.displayName = "PostActionButton";

export default PostActionButton;
