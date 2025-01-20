module.exports = {
    content: [
        './src/lib/components/**/*.{html,js,svelte,ts}',
        './src/routes/**/*.{html,js,svelte,ts}',
        './node_modules/@graphace/ui/dist/components/**/*.{html,js,svelte,ts}',
        './node_modules/@graphace/ui-graphql/dist/components/**/*.{html,js,svelte,ts}'
    ],
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
