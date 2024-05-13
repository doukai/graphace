module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}', '../../packages/**/src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontFamily: {
                title: ["Figtree", "Noto Sans JP", "Noto Sans", "sans-serif"],
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui')
    ],
    daisyui: {
        themes: [
            "light",
            "dark",
            "cupcake",
            "bumblebee",
            "emerald",
            "corporate",
            "synthwave",
            "retro",
            "cyberpunk",
            "valentine",
            "halloween",
            "garden",
            "forest",
            "aqua",
            "lofi",
            "pastel",
            "fantasy",
            "wireframe",
            "black",
            "luxury",
            "dracula",
            "cmyk",
            "autumn",
            "business",
            "acid",
            "lemonade",
            "night",
            "coffee",
            "winter",
        ],
    },
}
