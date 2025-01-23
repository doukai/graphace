import type { BaseTranslation } from '../../i18n-types';

const en: BaseTranslation = {
	code: {
		"-40101": 'Authentication failed',
		"-40900": 'Resource has been updated',
		"-40901": 'Existed unique values',
		"-99999": 'Requet error'
	},
	http: {
		"400": 'Bad Request',
		"404": 'Not Found',
		"408": 'Request Timeout',
		"500": 'Internal Server Error',
		unknown: 'Unknown Error'
	}
}

export default en;
