import type { Locales, TranslationFunctions } from './i18n-types';
declare const locale: import("svelte/store").Readable<Locales>, LL: import("svelte/store").Readable<TranslationFunctions>, setLocale: (locale: Locales) => void;
export { locale, LL, setLocale };
export default LL;
