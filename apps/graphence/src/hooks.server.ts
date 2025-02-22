import { json, redirect } from '@sveltejs/kit';
import type { Handle, RequestEvent, HandleServerError } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import jwt_decode from "jwt-decode";
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { detectLocale, i18n, isLocale } from '$i18n/i18n-util';
import { loadAllLocales } from '$i18n/i18n-util.sync';

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
	const locale: Locales = isLocale(lang) ? (lang as Locales) : getPreferredLocale(event);
	const LL = L[locale];

	// bind locale and translation functions to current request
	event.locals.locale = locale;
	event.locals.LL = LL;

	const { cookies, request } = event;
	const token = cookies.get('Authorization');

	const graphqlPathName = `/graphql`;
	const loginPathName = `/${locale}/login`;
	const registerPathName = `/${locale}/register`;
	if (event.url.pathname === graphqlPathName || event.url.pathname === loginPathName || event.url.pathname === registerPathName) {
		return await resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
	} else if (!token) {
		toLoginPage(loginPathName, event);
	} else {
		if (!event.locals.jwt && token) {
			event.locals.jwt = jwt_decode(token.substring(7));
		}
	}

	// replace html lang attribute with correct language
	const response = await resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
	if (response?.status === 401 && event.url.pathname !== loginPathName) {
		if (request.headers.get('Content-Type')?.includes('application/json')) {
			return json({ errors: [{ message: '-40100: unauthorized', extensions: { code: -40100 } }] }, { status: 401 });
		}
		toLoginPage(loginPathName, event);
	}
	return response;
}

export const handleError: HandleServerError = async ({ error, event, status }) => {
	console.error(error);
	const { headers } = event.request;
	headers.delete('Accept');
	const [, lang] = event.url.pathname.split('/');
	const locale = isLocale(lang) ? (lang as Locales) : getPreferredLocale(event);
	let errorPathName = `/${locale}/error/${status}`;
	if (browser) {
		goto(errorPathName);
	} else {
		throw redirect(307, errorPathName);
	}
};

const toLoginPage = (loginPathName: string, event: RequestEvent) => {
	const search = event.url.search;
	const urlSearchParams = new URLSearchParams(search);
	if (urlSearchParams.has('from')) {
		loginPathName += '?from=' + urlSearchParams.get('from');
	} else if (event.url.pathname !== loginPathName) {
		loginPathName += '?from=' + event.url.pathname;
	}
	if (browser) {
		goto(loginPathName);
	} else {
		throw redirect(307, loginPathName);
	}
}

const getPreferredLocale = ({ request }: RequestEvent): Locales => {
	// detect the preferred language the user has configured in his browser
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

	return detectLocale(acceptLanguageDetector);
}