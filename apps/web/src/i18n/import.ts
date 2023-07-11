import type { BaseTranslation, Namespaces } from './i18n-types'
import { storeTranslationToDisk, type ImportLocaleMapping } from 'typesafe-i18n/importer'
import type { Locales } from "./i18n-types"

export const importTranslationsForLocale = async (locale: Locales, translations: BaseTranslation, namespace: Namespaces) => {

    const localeMapping: ImportLocaleMapping = {
        locale,
        translations,
        namespaces: [namespace]
    }

    await storeTranslationToDisk(localeMapping);
}