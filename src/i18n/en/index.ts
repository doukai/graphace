import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	HI: "Welcome to Svelte Fall Summit {year:number}",
	localeName: { en: "English", zh: "Chinese" },
	message: {
		saveSuccess: "Save success",
		createSuccess: "Create Success",
		deleteSuccess: "Delete Success",
		requestFailed: "Request failed",
		saveFailed: "Save failed",
		createFailed: "Create failed",
		deleteFailed: "Delete failed",
	},
	components: {
		messageBox: {
			cancel: "Cancel",
			confirm: "Confirm"
		},
		ui: {
			cursor: {
				size: "size",
				previous: "Previous",
				next: "Next"
			},
			pagination: {
				size: "size",
				total: "{total:number} results",
				current: "Page {current:number}",
				previous: "Previous",
				next: "Next"
			},
			searchInput: {
				placeholder: "Search"
			}
		},
		graphql: {
			editor: {
				saveBtn: "Save",
				deleteBtn: "Delete",
				backBtn: "Back",
			},
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
		},
		routers: {
			type: {
				create: "Create"
			}
		}
	}
}

export default en
