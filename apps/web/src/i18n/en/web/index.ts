import type { BaseTranslation } from '../../i18n-types';

const en: BaseTranslation = {
    HI: "Welcome to Svelte Fall Summit {year:number}",
    localeName: { en: "English", zh: "Chinese" },
    message: {
        saveSuccess: "Save success",
        createSuccess: "Create success",
        removeSuccess: "Remove success",
        requestFailed: "Request failed",
        saveFailed: "Save failed",
        createFailed: "Create failed",
        removeFailed: "Remove failed",
    },
    components: {
        themeSelect: {
            btn: "Theme",
            themes: {
                light: "light",
                dark: "dark",
                cupcake: "cupcake",
                bumblebee: "bumblebee",
                emerald: "emerald",
                corporate: "corporate",
                synthwave: "synthwave",
                retro: "retro",
                cyberpunk: "cyberpunk",
                valentine: "valentine",
                halloween: "halloween",
                garden: "garden",
                forest: "forest",
                aqua: "aqua",
                lofi: "lofi",
                pastel: "pastel",
                fantasy: "fantasy",
                wireframe: "wireframe",
                black: "black",
                luxury: "luxury",
                dracula: "dracula",
                cmyk: "cmyk",
                autumn: "autumn",
                business: "business",
                acid: "acid",
                lemonade: "lemonade",
                night: "night",
                coffee: "coffee",
                winter: "winter"
            }
        },
        table: {
            removeModalTitle: "Remove row?",
            editBtn: "Edit",
            removeBtn: "Remove",
        }
    }
}

export default en;
