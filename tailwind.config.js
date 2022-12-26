const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')
let plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/layouts/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.rose,
            },
            animation: {
                "width-half": "width-half 0.2s ease-in-out",
            },
            keyframes: {
                "width-half": {
                    "from": {
                        width: 0,
                    },
                    "to": {
                        width: "50%",
                    }
                },
            }
        },
    },
    plugins: [
        plugin(({ addVariant }) => {
            addVariant('hocus', ['&:hover', '&:focus'])
            addVariant('hocus-within', ['&:hover', '&:focus-witihin'])
            addVariant('hocus-visible', ['&:hover', '&:focus-visible'])
        }),
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp')
    ],
}
