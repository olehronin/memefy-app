import {Spinner} from "@heroui/react";

const SpinnerLoader = () => {
    return (
        <div className={"flex items-center justify-center"}>
            <Spinner
                size={"lg"}
                color={"primary"}
                variant={"spinner"}
                aria-label={"Loading more..."}
            />
        </div>
    );
};

export default SpinnerLoader;