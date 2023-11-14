import { detectLocale, i18n, isLocale } from '$i18n/i18n-util';
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { loadAllLocales } from '$i18n/i18n-util.sync';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import { setSession } from '$houdini'
import jwt_decode from "jwt-decode";

loadAllLocales();
const L = i18n();

export const handle: Handle = async ({ event, resolve }) => {

	// read language slug
	const [, lang] = event.url.pathname.split('/');

	// redirect to base locale if no locale slug was found
	if (!lang) {
		const locale = getPreferredLocale(event);

		return new Response(null, {
			status: 302,
			headers: { Location: `/${locale}` },
		});
	}

	// if slug is not a locale, use base locale (e.g. api endpoints)
	const locale = isLocale(lang) ? (lang as Locales) : getPreferredLocale(event);
	const LL = L[locale];

	// bind locale and translation functions to current request
	event.locals.locale = locale;
	event.locals.LL = LL;

	const { cookies } = event;
	const token = cookies.get('Authorization');

	const loginPathName = `/${locale}/login`;
	if (!token && event.url.pathname !== loginPathName) {
		if (browser) {
			goto(loginPathName);
		} else {
			throw redirect(307, loginPathName);
		}
	} else {
		setSession(event, { token, locale });
		if (!event.locals.jwt && token) {
			event.locals.jwt = jwt_decode(token.substring(7));
		}
	}

	// replace html lang attribute with correct language
	const response = await resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
	if (response.status === 401 && event.url.pathname !== loginPathName || event.request.headers.get('Content-Type') === 'application/json' && response.headers.get('Content-Type') !== 'application/json') {
		if (browser) {
			goto(loginPathName);
		} else {
			throw redirect(307, loginPathName);
		}
	}
	return response;
}

const getPreferredLocale = ({ request }: RequestEvent): Locales => {
	// detect the preferred language the user has configured in his browser
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

	return detectLocale(acceptLanguageDetector);
}