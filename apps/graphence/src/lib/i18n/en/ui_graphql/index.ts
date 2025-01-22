/* eslint-disable */
import type { BaseTranslation } from '../../i18n-types'

const en_ui_graphql = {
	table: {
		removeModalTitle: 'Remove row?',
		editBtn: 'Edit',
		removeBtn: 'Remove',
		cancelBtn: 'Cancel',
		th: {
			filter: 'filter',
			cancel: 'cancel',
			noSort: 'No Sort',
			asc: 'ASC',
			desc: 'DESC',
			eq: 'Equals',
			neq: 'Not Equals',
			lk: 'Like',
			nlk: 'Not Like',
			gt: 'Greater Than',
			gte: 'Greater Equals',
			lt: 'Less Than',
			lte: 'Less Equals',
			nil: 'Is Null',
			nnil: 'Not Null',
			'in': 'In',
			nin: 'Not In',
			bt: 'Between',
			nbt: 'Not Between',
			filterPlaceholder: 'Filter..',
		},
		td: {
			save: 'save',
			clear: 'clear',
		},
	},
	grid: {
		buttons: {
			refresh: 'Refresh',
			save: 'Save',
			'new': 'New',
			append: 'Append',
			remove: 'Remove',
			ok: 'ok',
			canel: 'Canel',
			'export': 'Export',
			'import': 'Import',
		},
		message: {
			requiredField: 'Missing required fields',
		},
	},
} satisfies BaseTranslation

export default en_ui_graphql
