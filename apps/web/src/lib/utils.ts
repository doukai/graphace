import * as _ from "lodash";
// replaces the locale slug in a relative url
// e.g. /en/blog/article-1 => /de/blog/article-1
export const replaceLocaleInUrl = (path: string, locale: string): string => {
	const [, , ...rest] = path.split("/");
	return `/${[locale, ...rest].join("/")}`;
}

export const getNode = <T>(url: URL): T | undefined => {
	if (url.searchParams.has('node')) {
		let root = JSON.parse(url.searchParams.get('node') || '{}');
		if (url.searchParams.has('path')) {
			let path: (string | number)[] = JSON.parse(url.searchParams.get('path') || '[]');
			if (path.length > 0) {
				return _.get(root, path);
			}
		}
		return JSON.parse(root)
	}
}

export const getNodeParam = (url: URL): string | undefined => {
	return url.searchParams.get('node') || undefined;
}

export const updateNodeParam = <T>(url: URL, node: T): string => {
	if (url.searchParams.has('node')) {
		if (url.searchParams.has('path')) {
			let path: (string | number)[] = JSON.parse(url.searchParams.get('path') || '[]');
			if (path.length > 0) {
				let root = JSON.parse(url.searchParams.get('node') || '{}');
				_.set(root, path, node);
				return JSON.stringify(root);
			}
		}
	}
	return JSON.stringify(node);
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