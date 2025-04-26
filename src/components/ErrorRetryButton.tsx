import {memo, useCallback} from "react";
import {Button} from "@heroui/react";
import {ServerResponseError} from "@/types/apiTypes";
import {useMemeData} from "@/features/hooks/useMemeData";
import clsx from "clsx";
import {DEFAULT_PAGE_SIZE} from "@/utils/PageableBuilder";

interface ErrorRetryProps {
    error: ServerResponseError | null;
    className?: string;
}

const ErrorRetryButton = memo(({error, className}: ErrorRetryProps) => {
    const {fetchAll, getPageableBuilder, pageInfo} = useMemeData();

    const handleRetry = useCallback(async () => {
        const pageable = getPageableBuilder(pageInfo.number, pageInfo.size || DEFAULT_PAGE_SIZE);
        await fetchAll(pageable);
    }, [fetchAll, getPageableBuilder, pageInfo.number, pageInfo.size]);

    if (!error) return null;

    return (
        <div className={clsx("flex flex-col gap-4 text-red-500 text-center items-center justify-center p-4", className)}>
            <div className={"text-sm sm:text-base"}>
                {error.message || "Failed to load memes"}
            </div>
            <Button
                variant={"faded"}
                onPress={handleRetry}
                aria-label={"Retry loading"}
                className={"text-white px-4 py-2 max-w-48"}
            >
                Try again
            </Button>
        </div>
    );
});

ErrorRetryButton.displayName = "ErrorRetryButton";

export default ErrorRetryButton;