import { storeTranslationsToDisk, type ImportLocaleMapping } from 'typesafe-i18n/importer';
import ui from '@graphace/ui/i18n/export.json';
import ui_graphql from '@graphace/ui-graphql/i18n/export.json';

const importTranslationsForLocale = async (...exports: ImportLocaleMapping[][]) => {
    for (const localeMapping of exports) {
        await storeTranslationsToDisk(localeMapping);
    }
}

importTranslationsForLocale(ui, ui_graphql);