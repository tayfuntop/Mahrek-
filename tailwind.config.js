/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

const AntCardBody = plugin(function ({ addUtilities }) {
  addUtilities({
    ".ant-card-body": {
      padding: "0px !important",
      paddingBottom: "6px !important",
      paddingTop: "8px !important",
      paddingLeft: "8px !important",
      paddingRight: "8px !important",
    },
    ".ant-form-item": {
      marginBottom: "0 !important",
    },
    ".ant-card-body" : {
      padding: "0px !important",
    },
  });
});

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [AntCardBody],
}
