import { readTranslationsFromDisk, type ExportLocaleMapping } from 'typesafe-i18n/exporter';
import { writeFile, mkdir } from 'fs';

const exportTranslationsForLocale = async () => {
	const mapping: ExportLocaleMapping[] = await readTranslationsFromDisk();
	mkdir('src/lib/i18n', { recursive: true }, (err) => {
		if (err) throw err;
		writeFile(`src/lib/i18n/export.json`, JSON.stringify(mapping), 'utf8', (err) => {
			if (err) throw err;
		});
	});
}

exportTranslationsForLocale();