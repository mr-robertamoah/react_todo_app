module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        20: "80px",
        "1/2": "50%",
      },
      minHeight: {
        20: "80px",
        "1/2": "50%",
        content: "content",
      },
      maxWidth: {
        20: "80px",
        80: "320px",
        96: "384px",
        "1/2": "50%",
      },
      minWidth: {
        20: "80px",
        80: "320px",
        96: "384px",
        "1/2": "50%",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["focus", "hover"],
    },
  },
  plugins: [],
};
