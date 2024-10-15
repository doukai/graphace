import type { NamespaceGraphenceTranslation } from '../../i18n-types'

const zh: NamespaceGraphenceTranslation = {
    login: {
        detail: "全栈GraphQL开发平台, 基于GraphQL Svelte 响应式Java",
        account: "账号",
        login: "登录",
        password: "密码",
        forgot: "忘记密码?"
    },
    message: {
        saveSuccess: "保存成功",
        createSuccess: "创建成功",
        removeSuccess: "删除成功",
        unbindSuccess: "移除成功",
        requestFailed: "请求失败",
        saveFailed: "保存失败",
        createFailed: "创建失败",
        removeFailed: "删除失败",
        unbindFailed: "移除失败"
    },
    path: {
        home: "主页",
        create: "新建 {name}",
        select: "选择 {name}"
    },
    components: {
        search: {
            label: "搜索"
        },
        table: {
            removeModalTitle: "确认删除?",
            unbindModalTitle: "确认移除?",
            editBtn: "编辑",
            removeBtn: "删除",
            unbindBtn: "移除",
            selectBtn: "选择"
        },
        sideBarMenu: {
            modules: "模块"
        },
        userMenu: {
            profile: "个人资料",
            password: "修改密码",
            logout: "退出"
        },
        resetPassword: {
            password: "密码",
            newPassword: "新密码",
            repeatNewPassword: "重复新密码",
            inconsistent: "两次输入不一致"
        },
        agg: {
            columns: "字段",
            groupBy: "分组",
            orderBy: "排序",
            option: "选项",
            filter: "筛选",
            bookmark: "收藏"
        },
        query: {
            columns: "字段",
            join: "关联",
            joinColumns: "字段",
            orderBy: "排序",
            option: "选项",
            filter: "筛选",
            bookmark: "收藏"
        },
        grid: {
            buttons: {
                refresh: '刷新',
                save: '保存',
                new: '新页',
                append: '添加',
                remove: '删除',
                canel: '取消'
            },
            boolean: {
                true: '是',
                false: '否',
            },
            captions: {
                title: '筛选',
                save: '保存',
                reset: '重置',
                ok: '确认',
                cancel: '取消',
                add: '添加',
                placeholder: '输入值',
                and: '和',
                or: '或'
            },
            filterNames: {
                none: '无',
                empty: '为空',
                notEmpty: '不为空',
                eq: '等于',
                notEq: '不等于',
                begins: '以...开头',
                contains: '包含',
                notContains: '不包含',
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

export default zh;