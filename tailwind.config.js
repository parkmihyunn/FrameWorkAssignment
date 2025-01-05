module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1025px",
      xl: "1280px",
      xl2: "1360px",
    },
    extend: {
      keyframes: {
        fadein: {
          "0%": {
            opacity: "0.5",
            transform: "translateX(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
    },
    animation: {
      fadein: "fadein 0.3s",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: ["emerald", "dark", "forest", "synthwave"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
