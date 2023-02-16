import * as _ from "lodash";
import type { Error } from '@graphace/commons/types';

// replaces the locale slug in a relative url
// e.g. /en/blog/article-1 => /de/blog/article-1
export const replaceLocaleInUrl = (path: string, locale: string): string => {
	const [, , ...rest] = path.split("/");
	return `/${[locale, ...rest].join("/")}`;
}

export const getNode = <T>(url: URL): T | undefined => {
	if (url.searchParams.has('node')) {
		const root = JSON.parse(url.searchParams.get('node') || '{}');
		if (url.searchParams.has('path')) {
			const path: (string | number)[] = JSON.parse(url.searchParams.get('path') || '[]');
			if (path.length > 0) {
				return _.get(root, path);
			}
		}
		return root;
	}
}

export const getErrors = (url: URL): Record<string | number, Error> | undefined => {
	if (url.searchParams.has('errors')) {
		const root = JSON.parse(url.searchParams.get('errors') || '{}');
		if (url.searchParams.has('path')) {
			const path: (string | number)[] = JSON.parse(url.searchParams.get('path') || '[]');
			if (path.length > 0) {
				return _.get(root, path.map(item => ['items', item]).flatMap(items => items).concat('items'));
			}
		}
		return root;
	}
}

export const getNodeParam = (url: URL): string | undefined => {
	return url.searchParams.get('node') || undefined;
}

export const getErrorsParam = (url: URL): string | undefined => {
	return url.searchParams.get('errors') || undefined;
}

export const updateNodeParam = <T>(url: URL, node: T): string => {
	if (url.searchParams.has('node')) {
		if (url.searchParams.has('path')) {
			const path: (string | number)[] = JSON.parse(url.searchParams.get('path') || '[]');
			if (path.length > 0) {
				const root = JSON.parse(url.searchParams.get('node') || '{}');
				_.set(root, path, node);
				return JSON.stringify(root);
			}
		}
	}
	return JSON.stringify(node);
}

export const updateErrorsParam = (url: URL, errors: Record<string | number, Error>): string => {
	if (url.searchParams.has('errors')) {
		if (url.searchParams.has('path')) {
			const path: (string | number)[] = JSON.parse(url.searchParams.get('path') || '[]');
			if (path.length > 0) {
				const root = JSON.parse(url.searchParams.get('errors') || '{}');
				_.set(root, path.map(item => ['items', item]).flatMap(items => items).concat('items'), errors);
				return JSON.stringify(root);
			}
		}
	}
	return JSON.stringify(errors);
}

export const getParentPathParam = (url: URL): string => {
	let path: (string | number)[] = [];
	if (url.searchParams.has('path')) {
		path = JSON.parse(url.searchParams.get('path') || '[]');
	}
	path.pop();
	return JSON.stringify(path);
}

export const getChildPathParam = (url: URL, childName: string | number): string => {
	let path: (string | number)[] = [];
	if (url.searchParams.has('path')) {
		path = JSON.parse(url.searchParams.get('path') || '[]');
	}
	path.push(childName);
	return JSON.stringify(path);
}