/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./src/**/*.{html,js}",
        "./node_modules/tw-elements/dist/js/**/*.js"
    ],
    theme: {
        extend: {
            fontFamily: {
                Jua: ["Jua", "sans-serif"],
            },
        },
    },
    plugins: [require("tw-elements/dist/plugin")]
}
