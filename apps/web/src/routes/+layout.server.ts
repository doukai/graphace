import type { LayoutServerLoad } from './$types'
import { importTranslationsForLocale } from '~/i18n/import';
import en_ui from '@graphace/ui/i18n/en/index';

export const load: LayoutServerLoad = async ({ locals: { locale, LL } }) => {
	console.info(LL.log({ fileName: '+layout.server.ts' }))
	await importTranslationsForLocale('en', en_ui, 'ui');

	// pass locale information from "server-context" to "shared server + client context"
	return { locale }
}