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
        table: {
            removeModalTitle: "Remove row?",
            unbindModalTitle: "Unbind row?",
            editBtn: "Edit",
            removeBtn: "Remove",
            unbindBtn: "Unbind",
            selectBtn: "Select"
        },
        sideBarMenu: {
            modules: "Modules"
        },
        userMenu: {
            profile: "Profile",
            password: "Reset password",
            logout: "Logout"
        },
        resetPassword: {
            password: "Original password",
            newPassword: "New password",
            repeatNewPassword: "Repeat new Password",
            inconsistent: "Inconsistent"
        },
        agg: {
            columns: "Columns",
            groupBy: "Group By",
            orderBy: "Order By",
            option: "Options",
            filter: "Filter"
        }
    }
}

export default en;
