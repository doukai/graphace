import type { Translation } from '../i18n-types'

const zh: Translation = {
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
			}
		},
		graphql: {
			editor: {
				saveBtn: "保存",
				removeBtn: "删除",
				backBtn: "返回",
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
					filterPlaceholder: "过滤内容..",
				},
				td: {
					save: "保存",
					clear: "清除"
				}
			}
		},
		routers: {
			type: {
				create: "新建"
			}
		}
	}
}

export default zh