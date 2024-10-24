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
            modules: "Modules",
            statistics: "Statistics",
            grid: "Grid",
            table: "Table",
            bar: "Bar",
            line: "Line",
            pie: "Pie",
            mutation: "Edit"
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
            filter: "Filter",
            bookmark: "Bookmark"
        },
        query: {
            columns: "Columns",
            join: "Join",
            joinColumns: "Join Columns",
            orderBy: "Order By",
            option: "Options",
            filter: "Filter",
            bookmark: "Bookmark"
        },
        grid: {
            boolean: {
                true: 'Yes',
                false: 'No',
            },
            captions: {
                title: 'Filter',
                save: 'Save',
                reset: 'Reset',
                ok: 'OK',
                cancel: 'Cancel',
                add: 'Add',
                placeholder: 'Enter value',
                and: 'And',
                or: 'Or'
            },
            filterNames: {
                none: 'None',
                empty: 'Not set',
                notEmpty: 'Set',
                eq: 'Equal',
                notEq: 'Not equal',
                begins: 'Begins with',
                contains: 'Contains',
                notContains: 'Does not contain',
                eqN: '=',
                neqN: '!=',
                gt: '>',
                gte: '>=',
                lt: '<',
                lte: '<='
            }
        }
    }
}

export default en;
