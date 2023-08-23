import { HoudiniClient } from '$houdini';
import { PUBLIC_GRAPHQL_URL } from '$env/static/public';

export default new HoudiniClient({
	url: PUBLIC_GRAPHQL_URL,
	fetchParams({ session }) {
		return {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${session?.token}`,
			},
		}
	},
	// throwOnError: {
	// 	// can be any combination of
	// 	// query, mutation, subscription, and all
	// 	operations: ['all'],
	// 	// the function to call
	// 	error: (errors, ctx) => {
	// 		console.error(errors);
	// 	}
	// }
});
