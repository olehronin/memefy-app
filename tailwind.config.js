import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  // plugins: [heroui()],
  plugins: [
    heroui({
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
      themes: {
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
              "500": "#4f607d",
              "600": "#62789d",
              "700": "#8293b0",
              "800": "#b1bbce",
              "900": "#d0d6e2",
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
                "900": "#e3ecfa",
              },
            },
            primary: {
              DEFAULT: "#5a82bf",
              foreground: "#ECF3F8",
            },
            secondary: {
              DEFAULT: "#37444a",
              foreground: "#ECF3F8",
            },
            // content1: "#20252e",
            // content2: "#232933",
            // content3: "#272e38",
            // content4: "#2a323d",
            content1: "#1b212b",
            content2: "#1E2530",
            content3: "#212935",
            content4: "#252E3B",
            focus: "#6f90c3",
            divider: "#36404e",
          },
        },
      },
    }),
  ],
}
