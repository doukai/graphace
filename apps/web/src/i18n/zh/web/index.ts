import type { NamespaceWebTranslation } from '../../i18n-types'

const zh: NamespaceWebTranslation = {
    HI: "欢迎来到 Svelte 秋季峰会 {year}",
    localeName: { en: "英文", zh: "中文" },
    message: {
        saveSuccess: "保存成功",
        createSuccess: "创建成功",
        removeSuccess: "删除成功",
        requestFailed: "请求失败",
        saveFailed: "保存失败",
        createFailed: "创建失败",
        removeFailed: "删除失败",
    },
    components: {
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
            editBtn: "编辑",
            removeBtn: "删除"
        }
    }
}

export default zh;