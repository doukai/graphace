import { readTranslationsFromDisk, type ExportLocaleMapping } from 'typesafe-i18n/exporter';
import { writeFile } from 'fs';

const exportTranslationsForLocale = async () => {
	const mapping: ExportLocaleMapping[] = await readTranslationsFromDisk();
	writeFile(`src/lib/i18n/export.json`, JSON.stringify(mapping), 'utf8', () => { });
}

exportTranslationsForLocale();