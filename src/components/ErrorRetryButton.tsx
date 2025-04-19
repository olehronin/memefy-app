import { Button } from "@heroui/react";
import { ServerResponseError } from "@/types/apiTypes.ts";
import { useMemeStore } from "@/features/useMemeStore.ts";
import clsx from "clsx";
import { memo } from "react";

interface ErrorRetryProps {
    error: ServerResponseError | null;
    className?: string;
}

const ErrorRetryButton = memo(({ error, className }: ErrorRetryProps) => {
    const fetchAll = useMemeStore((state) => state.fetchAll);

    const handleRetry = async () => {
        await fetchAll();
    };

    if (!error) return null;

    return (
        <div className={clsx("flex flex-col gap-4 text-red-500 text-center items-center p-4", className)}>
            <div>Error: {error.message || "Failed to load memes"}</div>
            <Button
                variant={"faded"}
                onPress={handleRetry}
                aria-label={"Retry loading"}
                className={"text-white px-4 py-2 max-w-48 "}
            >
                Try Again
            </Button>
        </div>
    );
});

ErrorRetryButton.displayName = "ErrorRetryButton";

export default ErrorRetryButton;
