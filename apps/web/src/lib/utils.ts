import * as _ from "lodash";
// replaces the locale slug in a relative url
// e.g. /en/blog/article-1 => /de/blog/article-1
export const replaceLocaleInUrl = (path: string, locale: string): string => {
	const [, , ...rest] = path.split("/");
	return `/${[locale, ...rest].join("/")}`;
}

export const getNode = (url: URL): any => {
	let node = {};
	let path: (string | number)[] = [];
	if (url.searchParams.has('node')) {
		let element = JSON.parse(url.searchParams.get('node') || '{}');
		if (url.searchParams.has('path')) {
			path = JSON.parse(url.searchParams.get('path') || '[]');
			path.forEach((value) => {
				element = element[value];
			});
		}
		node = element || {};
	}
	return node;
}

export const getNodeParam = (url: URL): string => {
	let root: any = {};
	if (url.searchParams.has('node')) {
		root = JSON.parse(url.searchParams.get('node') || '{}');
	}
	return JSON.stringify(root);
}

export const updateNodeParam = (url: URL, node: any): string => {
	let root: any = {};
	let path: (string | number)[] = [];
	if (url.searchParams.has('node')) {
		root = JSON.parse(url.searchParams.get('node') || '{}');
		if (url.searchParams.has('path')) {
			path = JSON.parse(url.searchParams.get('path') || '[]');
			_.set(root, path, JSON.parse(node));
		}
	}
	return JSON.stringify(root);
}

export const getParentPathParam = (url: URL): string => {
	let path: (string | number)[] = [];
	if (url.searchParams.has('path')) {
		path = JSON.parse(url.searchParams.get('path') || '[]');
		path.pop();
	}
	return JSON.stringify(path);
}

export const getChildPathParam = (url: URL, childName: string): string => {
	let path: (string | number)[] = [];
	if (url.searchParams.has('path')) {
		path = JSON.parse(url.searchParams.get('path') || '[]');
		path.push(childName);
	}
	return JSON.stringify(path);
}