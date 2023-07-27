import * as _ from "lodash";
import type { Errors } from '../types';

// replaces the locale slug in a relative url
// e.g. /en/blog/article-1 => /de/blog/article-1
export const replaceLocaleInUrl = (url: URL, locale: string, full = false): string => {
	const [, , ...rest] = url.pathname.split('/');
	const new_pathname = `/${[locale, ...rest].join('/')}`;
	if (!full) {
		return `${new_pathname}${url.search}`;
	}
	const newUrl = new URL(url.toString());
	newUrl.pathname = new_pathname;
	return newUrl.toString();
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

export const getErrors = (url: URL): Record<string | number, Errors> | undefined => {
	if (url.searchParams.has('errors')) {
		const root = JSON.parse(url.searchParams.get('errors') || '{}');
		if (url.searchParams.has('path')) {
			const path: (string | number)[] = JSON.parse(url.searchParams.get('path') || '[]');
			if (path.length > 0) {
				return _.get(root, path.map(item => [item, 'iterms']).flatMap(iterms => iterms));
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

export const updateNodeParam = (url: URL, node: object | null | undefined): string => {
	if (url.searchParams.has('node')) {
		if (url.searchParams.has('path')) {
			const path: (string | number)[] = JSON.parse(url.searchParams.get('path') || '[]');
			if (path.length > 0) {
				const root = JSON.parse(url.searchParams.get('node') || '{}');
				if (node === undefined || (node != null && Object.keys(node).length === 0)) {
					_.unset(root, path);
				} else {
					_.set(root, path, node);
				}
				return JSON.stringify(root);
			}
		}
	}
	return JSON.stringify(node);
}

export const updateErrorsParam = (url: URL, errors: Record<string | number, Errors> | null | undefined): string => {
	if (url.searchParams.has('errors')) {
		if (url.searchParams.has('path')) {
			const path: (string | number)[] = JSON.parse(url.searchParams.get('path') || '[]');
			if (path.length > 0) {
				const root = JSON.parse(url.searchParams.get('errors') || '{}');
				if (errors === undefined || (errors != null && Object.keys(errors).length === 0)) {
					_.unset(root, path.map(item => [item, 'iterms']).flatMap(iterms => iterms));
				} else {
					_.set(root, path.map(item => [item, 'iterms']).flatMap(iterms => iterms), errors);
				}
				return JSON.stringify(root);
			}
		}
	}
	return JSON.stringify(errors);
}

export const getPathParam = (url: URL): string => {
	let path: (string | number)[] = [];
	if (url.searchParams.has('path')) {
		path = JSON.parse(url.searchParams.get('path') || '[]');
	}
	return JSON.stringify(path);
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