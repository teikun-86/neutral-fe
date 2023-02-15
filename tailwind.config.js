const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')
let plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/layouts/**/*.{js,ts,jsx,tsx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: colors.rose,
                gray: {
                    1000: "#0b101b",
                }
            },
            animation: {
                "width-half": "width-half 0.2s ease-in-out",
                "width-2/3": "width-2/3 0.2s ease-in-out",
                "bounce-x": "bounce-x 3s ease-in-out infinite",
                "ripple": "ripple 1s cubic-bezier(0, 0, 0.2, 1)",
                "bounce-fast": "bounce 0.5s infinite",
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
                "width-2/3": {
                    "from": {
                        width: 0,
                    },
                    "to": {
                        width: "66.666667%",
                    }
                },
                "ripple": {
                    "0%": {
                        transform: "scale(.8)",
                        opacity: 1,
                    },
                    "100%": {
                        transform: "scale(2.4)",
                        opacity: 0,
                    }
                },
                "bounce-x": {
                    "0%": {
                        transform: "translateX(-100%)",
                    },
                    "50%": {
                        transform: "translateX(400%)",
                    },
                    "100%": {
                        transform: "translateX(-100%)",
                    }
                }
            },
            transitionProperty: {
                'height': 'height',
            },
            fontFamily: {
                // sans: ['var(--font-source-sans-pro)', ...defaultTheme.fontFamily.sans],
            },
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
