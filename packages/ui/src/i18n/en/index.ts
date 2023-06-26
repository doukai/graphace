import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	HI: "Welcome to Svelte Fall Summit {year:number}",
	localeName: { en: "English", zh: "Chinese" },
	message: {
		saveSuccess: "Save success",
		createSuccess: "Create success",
		removeSuccess: "Remove success",
		requestFailed: "Request failed",
		saveFailed: "Save failed",
		createFailed: "Create failed",
		removeFailed: "Remove failed",
	},
	components: {
		ThemeSelect:{
			light: "light",
			dark: "dark",
			cupcake: "cupcake",
			bumblebee: "bumblebee",
			emerald: "emerald",
			corporate: "corporate",
			synthwave: "synthwave",
			retro: "retro",
			cyberpunk: "cyberpunk",
			valentine: "valentine",
			halloween: "halloween",
			garden: "garden",
			forest: "forest",
			aqua: "aqua",
			lofi: "lofi",
			pastel: "pastel",
			fantasy: "fantasy",
			wireframe: "wireframe",
			black: "black",
			luxury: "luxury",
			dracula: "dracula",
			cmyk: "cmyk",
			autumn: "autumn",
			business: "business",
			acid: "acid",
			lemonade: "lemonade",
			night: "night",
			coffee: "coffee",
			winter: "winter",
		},
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
			},
			inputList: {
				add: "Add",
				remove: "Remove"
			}
		},
		graphql: {
			editor: {
				saveBtn: "Save",
				selectBtn: "Select",
				removeBtn: "Remove",
				backBtn: "Back",
				createType: "Create a new {name:string}",
				newType: "New {name:string}",
				bindType: "Bind {name:string}",
			},
			table: {
				removeModalTitle: "Remove row?",
				editBtn: "Edit",
				removeBtn: "Remove",
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
					bt: "Between",
					nbt: "Not Between",
					filterPlaceholder: "Filter..",
				},
				td: {
					save: "save",
					clear: "clear"
				}
			}
		}
	},
	routers: {
		type: {
			create: "Create",
			remove: "Remove"
		}
	}
}

export default en
