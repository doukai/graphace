import type { Translation } from '../i18n-types'
import ui from '@graphace/ui/i18n/zh/index'

const zh: Translation = {
	ui: ui,
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
		ThemeSelect: {
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
		messageBox: {
			cancel: "取消",
			confirm: "确认"
		},
		ui: {
			cursor: {
				size: "条数",
				previous: "上一页",
				next: "下一页"
			},
			pagination: {
				size: "条数",
				total: "共 {total} 条",
				current: "第 {current} 页",
				previous: "上一页",
				next: "下一页"
			},
			searchInput: {
				placeholder: "搜索内容"
			},
			inputList: {
				add: "添加",
				remove: "删除"
			}
		},
		graphql: {
			editor: {
				saveBtn: "保存",
				selectBtn: "选择",
				removeBtn: "删除",
				backBtn: "返回",
				createType: "创建 {name}",
				newType: "新建 {name}",
				bindType: "绑定 {name}",
			},
			table: {
				removeModalTitle: "确认删除?",
				editBtn: "编辑",
				removeBtn: "删除",
				cancelBtn: "取消",
				th: {
					filter: "过滤",
					cancel: "取消",
					noSort: "不排序",
					asc: "正序",
					desc: "倒序",
					eq: "等于",
					neq: "不等于",
					lk: "相似",
					nlk: "不相似",
					gt: "大于",
					gte: "大于等于",
					lt: "小于",
					lte: "小于等于",
					nil: "为空",
					nnil: "不为空",
					in: "属于",
					nin: "不属于",
					bt: "介于...之间",
					nbt: "介于...之外",
					filterPlaceholder: "过滤内容..",
				},
				td: {
					save: "保存",
					clear: "清除"
				}
			}
		}
	},
	routers: {
		type: {
			search: "搜索",
			create: "新建",
			remove: "删除",
			save: "保存",
			back: "返回"
		}
	}
}

export default zh