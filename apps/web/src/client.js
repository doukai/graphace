import { HoudiniClient } from '$houdini';
import { error } from '@sveltejs/kit';

export default new HoudiniClient({
	url: 'http://localhost:8080/graphql',
	fetchParams({ session }) {
		return {
			headers: {
				'Content-Type': 'application/json'
			},
		}
	},
	throwOnError: {
		// can be any combination of
		// query, mutation, subscription, and all
		operations: ['all'],
		// the function to call
		error: (errors, ctx) =>
			error(
				500,
				`(${ctx.artifact.name}): ` + errors.map((err) => err.message).join('. ') + '.'
			),
	}
});
