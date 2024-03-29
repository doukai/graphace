import type { BaseTranslation } from '../../i18n-types';

const en: BaseTranslation = {
    login: {
        detail: "Full-stack GraphQL development platform, powered by GraphQL Svelte and Reactor Java",
        account: "Account",
        login: "Login",
        password: "Password",
        forgot: "Forgot password?"
    },
    message: {
        saveSuccess: "Save success",
        createSuccess: "Create success",
        removeSuccess: "Remove success",
        unbindSuccess: "Unbind success",
        requestFailed: "Request failed",
        saveFailed: "Save failed",
        createFailed: "Create failed",
        removeFailed: "Remove failed",
        unbindFailed: "Unbind failed"
    },
    path: {
        home: "Home",
        create: "Create {name:string}",
        select: "Select {name:string}"
    },
    components: {
        search: {
            label: "Search"
        },
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
            unbindModalTitle: "Unbind row?",
            editBtn: "Edit",
            removeBtn: "Remove",
            unbindBtn: "Unbind",
            selectBtn: "Select"
        },
        userMenu: {
            profile: "Profile",
            settings: "Settings",
            logout: "Logout"
        }
    },
    errors: {
        "-40101": 'Authentication failed'
    }
}

export default en;
