import type { Translation } from '../i18n-types'

const zh: Translation = {
	localeName: { en: "英文", zh: "中文" },
	HI: "欢迎来到 Svelte 秋季峰会 {year}",
	components: {
		ui: {
			table: {
				deleteModalTitle: "确认删除?",
				editBtn: "编辑",
				deleteBtn: "删除",
				cancelBtn: "取消",
				th: {
					filter: "过滤",
					cancel: "取消",
					noSort: "不排序",
					asc: "正序",
					desc: "倒叙",
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
					filterPlaceholder: "过滤内容..",
				},
				td: {
					save: "保存",
					clear: "清除"
				}
			}
		}
	}
}

export default zh