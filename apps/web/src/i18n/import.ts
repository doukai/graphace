import type { BaseTranslation } from './i18n-types'
import { storeTranslationToDisk, type ImportLocaleMapping } from 'typesafe-i18n/importer'
import { loadLocaleAsync, loadNamespaceAsync } from '../i18n/i18n-util.async'
import type { Locales } from "./i18n-types"

const importTranslationsForLocale = async (locale: Locales, translations: BaseTranslation, namespaces: string[] | undefined) => {

    const localeMapping: ImportLocaleMapping = {
        locale,
        translations,
        namespaces: namespaces
    }

    await storeTranslationToDisk(localeMapping);
    await loadNamespaceAsync(locale, 'ui');
}

export default importTranslationsForLocale;