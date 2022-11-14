module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}', '../../packages/**/components/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui')
    ],
}
