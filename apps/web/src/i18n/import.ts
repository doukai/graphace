import type { BaseTranslation, Namespaces } from './i18n-types'
import { storeTranslationToDisk, type ImportLocaleMapping } from 'typesafe-i18n/importer'
import type { Locales } from "./i18n-types"
import en_ui from '@graphace/ui/i18n/en/index';
import en_uiGraphql from '@graphace/ui-graphql/i18n/en/index';

const importTranslationsForLocale = async (locale: Locales, translations: BaseTranslation, namespace: Namespaces) => {

    const localeMapping: ImportLocaleMapping = {
        locale,
        translations,
        namespaces: [namespace]
    };

    const result = await storeTranslationToDisk(localeMapping);

    console.log(`translations imported for locale '${result}'`);
}

importTranslationsForLocale('en', en_ui, 'ui');
importTranslationsForLocale('en', en_uiGraphql, 'uiGraphql');