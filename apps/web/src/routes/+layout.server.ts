import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { Locales } from '~/i18n/i18n-types';
import { replaceLocaleInUrl } from '../components/utils';
import { baseLocale, locales } from '~/i18n/i18n-util';
import { loadLocaleAsync } from '~/i18n/i18n-util.async';

export const load: LayoutServerLoad = async ({ url, locals, params }) => {
    // fallback needed because of https://github.com/sveltejs/kit/issues/3647
    const lang = params.lang ? (params.lang as Locales) : (url.pathname.split('/')[1] as Locales);

    // redirect to preferred language if user comes from page root
    if (!lang) {
        // throw redirect(302, `/${locals.locale}`);
    }

    // redirect to base locale if language is not present
    if (!locales.includes(lang)) {
        // throw redirect(302, replaceLocaleInUrl(url.pathname, baseLocale));
    }

    // await loadLocaleAsync(lang);

    return { props: { locale: lang } };
};