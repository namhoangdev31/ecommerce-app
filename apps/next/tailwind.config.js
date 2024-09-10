// const {
//   theme
// } = require('app/design/tailwind/theme')
const {
  nextui
} = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    '../../packages/**/*.{js,jsx,ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [nextui({
    prefix: "nextui",
    addCommonColors: false,
    defaultTheme: "light",
    defaultExtendTheme: "light",
    layout: {
      spacingUnit: 4,
      disabledOpacity: 0.5,
      dividerWeight: "1px",
      fontSize: {
        tiny: "0.75rem",
        small: "0.875rem",
        medium: "1rem",
        large: "1.125rem",
      },
    },
    themes: {
      light: {
        layout: {
          boxShadow: {
            small: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            medium: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            large: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
        },
        colors: {
          background: "#FFFFFF",
          foreground: "#11181C",
          primary: {
            50: "#E6F1FE",
            100: "#CCE4FD",
            200: "#99C9FB",
            300: "#66AEF9",
            400: "#3393F7",
            500: "#0078F5",
            600: "#0060C4",
            700: "#004893",
            800: "#003062",
            900: "#001831",
          },
          secondary: {
            50: "#F2F2F2",
            100: "#E6E6E6",
            200: "#CCCCCC",
            300: "#B3B3B3",
            400: "#999999",
            500: "#808080",
            600: "#666666",
            700: "#4D4D4D",
            800: "#333333",
            900: "#1A1A1A",
          },
        },
      },
      dark: {
        layout: {
          boxShadow: {
            small: "0 1px 2px 0 rgba(255, 255, 255, 0.05)",
            medium: "0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)",
            large: "0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)",
          },
        },
        colors: {
          background: "#000000",
          foreground: "#ECEDEE",
          primary: {
            50: "#001831",
            100: "#003062",
            200: "#004893",
            300: "#0060C4",
            400: "#0078F5",
            500: "#3393F7",
            600: "#66AEF9",
            700: "#99C9FB",
            800: "#CCE4FD",
            900: "#E6F1FE",
          },
          secondary: {
            50: "#1A1A1A",
            100: "#333333",
            200: "#4D4D4D",
            300: "#666666",
            400: "#808080",
            500: "#999999",
            600: "#B3B3B3",
            700: "#CCCCCC",
            800: "#E6E6E6",
            900: "#F2F2F2",
          },
        },
      },
    }
  })],
  important: 'html',
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
}