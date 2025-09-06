/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx","./components/**/*.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {}
  },
  plugins: [],
  darkMode: 'class', // This is the key change

  corePlugins: {
    preflight: false, // Disable Tailwind's base styles that might conflict
  },

}


