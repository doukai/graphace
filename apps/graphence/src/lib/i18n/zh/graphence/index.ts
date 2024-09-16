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
        }
    }
}

export default zh;