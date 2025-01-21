import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { env } from '$env/dynamic/public';
import { HoudiniClient } from '$houdini';
import type { ClientPlugin } from '$houdini'

const authPlugin: ClientPlugin = () => {
	return {
		afterNetwork(ctx, { value, resolve }) {
			if (value.errors) {
				console.error(value.errors);
				if (value.errors?.map(error => error.extensions).some(extensions => extensions?.code == -40100)) {
					let loginPathName = `/${ctx.session?.locale}/login`;
					const search = window.location.search;
					const urlSearchParams = new URLSearchParams(search);
					if (urlSearchParams.has('from')) {
						loginPathName += '?from=' + urlSearchParams.get('from');
					} else if (window.location.pathname !== loginPathName) {
						loginPathName += '?from=' + window.location.pathname;
					}
					goto(loginPathName);
				}
			}
			// keep the information flowing to the user
			resolve(ctx, value);
		}
	}
}

export default new HoudiniClient({
	url: browser ? '/graphql' : env.PUBLIC_GRAPHQL_URL,
	plugins: [
		authPlugin
	],
	fetchParams({ session, document }) {
		let headers = {
			Authorization: `${session?.token}`,
		};

		if (document.name === 'Mutation_singleUpload' || document.name === 'Mutation_multipleUpload') {
			return {
				headers
			}
		}
		return {
			headers: {
				...headers,
				'Content-Type': 'application/json'
			},
		}
	}
});
