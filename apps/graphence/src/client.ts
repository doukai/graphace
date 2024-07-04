import { redirect } from '@sveltejs/kit';
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
					const loginPathName = `/${ctx.session?.locale}/login`;
					if (browser) {
						goto(loginPathName);
					} else {
						throw redirect(307, loginPathName);
					}
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
	fetchParams({ session }) {
		return {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${session?.token}`,
			},
		}
	}
});
