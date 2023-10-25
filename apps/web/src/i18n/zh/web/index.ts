import type { NamespaceWebTranslation } from '../../i18n-types'

const zh: NamespaceWebTranslation = {
    welcome: "Welcome to {name}",
    localeName: { en: "英文", zh: "中文" },
    login: {
        detail: "多式联运平台",
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
        themeSelect: {
            btn: "主题",
            themes: {
                light: "明亮",
                dark: "黑暗",
                cupcake: "蛋糕",
                bumblebee: "黄蜂",
                emerald: "翡翠",
                corporate: "公司",
                synthwave: "电子",
                retro: "复古",
                cyberpunk: "赛博朋克",
                valentine: "粉色",
                halloween: "万圣节",
                garden: "花园",
                forest: "森林",
                aqua: "湖水",
                lofi: "摇滚",
                pastel: "粉笔",
                fantasy: "幻想",
                wireframe: "线框",
                black: "黑色",
                luxury: "奢华",
                dracula: "德古拉",
                cmyk: "四分色",
                autumn: "秋天",
                business: "商务",
                acid: "原子",
                lemonade: "柠檬",
                night: "夜晚",
                coffee: "咖啡",
                winter: "冬天"
            },
        },
        table: {
            removeModalTitle: "确认删除?",
            unbindModalTitle: "确认移除?",
            editBtn: "编辑",
            removeBtn: "删除",
            unbindBtn: "移除",
            selectBtn: "选择"
        },
        userMenu: {
            profile: "个人资料",
            settings: "系统设置",
            logout: "退出"
        }
    },
    errors: {
        "-40101": '认证失败'
    }
}

export default zh;