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
            maxWidth: {
                'imageFull': '12rem',
            },
            screens: {
                '2sm': '480px',
            }
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require("tw-elements/dist/plugin")
    ]
}
