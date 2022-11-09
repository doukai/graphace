import { detectLocale } from './i18n/i18n-util'
import type { Handle } from '@sveltejs/kit'
import type { RequestEvent } from '@sveltejs/kit/types'
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors'

export const handle: Handle = async ({ event, resolve }) => {
	// detect the preferred language the user has configured in his browser
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const headers = getHeaders(event);
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector({ headers });

	event.locals.locale = detectLocale(acceptLanguageDetector);

	const response = await resolve(event);

	// read language slug
	const [, lang] = event.url.pathname.split('/');

	// replace html lang attribute with correct language
	const body = await response.text();

	return new Response(body.replace('<html lang="en">', `<html lang="${lang}">`), response);
}

const getHeaders = (event: RequestEvent) => {
	const headers: Record<string, string> = {};
	event.request.headers.forEach((value: string, key: string | number) => headers[key] = value);
	return headers;
}