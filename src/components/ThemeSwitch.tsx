import { FC, memo, useEffect, useState } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { SwitchProps, useSwitch } from "@heroui/switch";
import clsx from "clsx";
import { useTheme } from "@heroui/use-theme";

import { MoonFilledIcon, SunFilledIcon } from "@/utils/icons.tsx";

export interface ThemeSwitchProps {
    className?: string;
    classNames?: SwitchProps["classNames"];
}

const ThemeSwitch: FC<ThemeSwitchProps> = memo(({ className, classNames }) => {
    const [isMounted, setIsMounted] = useState(false);

    const { theme, setTheme } = useTheme();

    const {
        Component,
        slots,
        isSelected,
        getBaseProps,
        getInputProps,
        getWrapperProps
    } = useSwitch({
        isSelected: theme === "light",
        onChange: () => setTheme(theme === "light" ? "dark" : "light")
    });

    useEffect(() => {
        setIsMounted(true);
    }, [isMounted]);

    if (!isMounted) return <div className="w-6 h-6" />;

    return (
        <Component
            aria-label={isSelected ? "Switch to dark mode" : "Switch to light mode"}
            {...getBaseProps({
                className: clsx(
                    "px-px transition-opacity hover:opacity-80 cursor-pointer",
                    className,
                    classNames?.base
                )
            })}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <div
                {...getWrapperProps()}
                className={slots.wrapper({
                    class: clsx(
                        [
                            "w-10 h-10",
                            "bg-transparent",
                            "rounded-xl",
                            "flex items-center justify-center",
                            "group-data-[selected=true]:bg-transparent",
                            "hover:bg-default/40",
                            "!text-foreground"
                        ],
                        classNames?.wrapper
                    )
                })}
            >
                {isSelected ? (
                    <MoonFilledIcon size={22} />
                ) : (
                    <SunFilledIcon size={22} />
                )}
            </div>
        </Component>
    );
});

ThemeSwitch.displayName = "ThemeSwitch";

export default ThemeSwitch;