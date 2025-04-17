import { heroui } from "@heroui/theme";

/** @type {import("tailwindcss").Config} */
export default {
    content: [
        "./index.html",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/config/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            animation: {
                "count-up": "countUp 0.4s ease-out forwards",
                "count-down": "countDown 0.4s ease-out forwards",
            },
            keyframes: {
                countUp: {
                    "0%": { transform: "translateY(10px)", opacity: "0", filter: "blur(6px)" },
                    "100%": { transform: "translateY(0)", opacity: "1", filter: "blur(0)" },
                },
                countDown: {
                    "0%": { transform: "translateY(-10px)", opacity: "0", filter: "blur(6px)" },
                    "100%": { transform: "translateY(0)", opacity: "1", filter: "blur(0)" },
                },
            },
        },
    },
    darkMode: "class",
    plugins: [
        heroui({
            // defaultTheme: "dark",
            // defaultExtendTheme: "light",
            themes: {
                light: {
                    colors: {
                        background: "#d2daed",
                        foreground: "#1f2a44",
                        default: {
                            "50": "#e8ecf3",
                            "100": "#d6dbe1",
                            "200": "#d9e0e8",
                            "300": "#c7d1dd",
                            "400": "#b7c3d4",
                            "500": "#a7b4ca",
                            "600": "#8592ac",
                            "700": "#555f78",
                            "800": "#3e465e",
                            "900": "#363c50",
                            DEFAULT: "#e9edf2",
                            foreground: {
                                "50": "#2a3b5e",
                                "100": "#3c4e73",
                                "200": "#4b5e85",
                                "300": "#5b6e96",
                                "400": "#6b7ea7",
                                "500": "#7b8eb8",
                                "600": "#8c9ec9",
                                "700": "#9caeda",
                                "800": "#adbfeb",
                                "900": "#c0d2fc"
                            }
                        },
                        primary: {
                            DEFAULT: "#3b82f6",
                            foreground: "#ffffff"
                        },
                        secondary: {
                            DEFAULT: "#e5e7eb",
                            foreground: "#1f2a44"
                        },
                        content1: "#f9fafb",
                        content2: "#f3f4f6",
                        content3: "#e5e7eb",
                        content4: "#d1d5db",
                        focus: "#60a5fa",
                        divider: "#d1d5db"
                    }
                },
                dark: {
                    colors: {
                        background: "#161a20",
                        foreground: "#ECF3F8",
                        default: {
                            "50": "#202834",
                            "100": "#27303f",
                            "200": "#313c4e",
                            "300": "#3b485e",
                            "400": "#45546e",
                            "500": "#5d7091",
                            "600": "#8aa2cd",
                            "700": "#a8badf",
                            "800": "#bacae3",
                            "900": "#dadfef",
                            DEFAULT: "#2c3645",
                            foreground: {
                                "50": "#56606e",
                                "100": "#6b7481",
                                "200": "#79818e",
                                "300": "#8f96a3",
                                "400": "#9ba2ae",
                                "500": "#a7afbc",
                                "600": "#b9c0cd",
                                "700": "#ced6e3",
                                "800": "#d8e0ed",
                                "900": "#e3ecfa"
                            }
                        },
                        primary: {
                            DEFAULT: "#5a82bf",
                            foreground: "#ECF3F8"
                        },
                        secondary: {
                            DEFAULT: "#37444a",
                            foreground: "#ECF3F8"
                        },
                        content1: "#1b212b",
                        content2: "#1E2530",
                        content3: "#212935",
                        content4: "#252E3B",
                        focus: "#6f90c3",
                        divider: "#36404e"
                    }
                }
            }
        })
    ]
};