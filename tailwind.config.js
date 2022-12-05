const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
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
    plugins: [],
}
