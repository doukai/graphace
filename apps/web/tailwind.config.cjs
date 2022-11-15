module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}', '../../packages/**/src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui')
    ],
}
