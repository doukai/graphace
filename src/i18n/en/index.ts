import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	localeName: { en: "English", zh: "Chinese" },
	HI: "Welcome to Svelte Fall Summit {year:number}",
	components: {
		ui: {
			table: {
				deleteModalTitle: "Delete row?",
				editBtn: "Edit",
				deleteBtn: "Delete",
				cancelBtn: "Cancel",
				th: {
					filter: "filter",
					cancel: "cancel",
					noSort: "No Sort",
					asc: "ASC",
					desc: "DESC",
					eq: "Equals",
					neq: "Not Equals",
					lk: "Like",
					nlk: "Not Like",
					gt: "Greater Than",
					gte: "Greater Equals",
					lt: "Less Than",
					lte: "Less Equals",
					nil: "Is Null",
					nnil: "Not Null",
					in: "In",
					nin: "Not In",
					filterPlaceholder: "Filter..",
				},
				td: {
					save: "save",
					clear: "clear"
				}
			}
		}
	}
}

export default en
