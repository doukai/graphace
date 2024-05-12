/* eslint-disable */
import type { BaseTranslation } from '../../i18n-types'

const en_uiGraphql = {
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
	multiSelect: {
		createOptionMsg: 'Create this option...',
		defaultDisabledTitle: 'This option is disabled',
		disabledInputTitle: 'This input is disabled',
		duplicateOptionMsg: 'This option is already selected',
		noMatchingOptionsMsg: 'No matching options',
		removeAllTitle: 'Remove all',
		removeBtnTitle: 'Remove',
	},
} satisfies BaseTranslation

export default en_uiGraphql
