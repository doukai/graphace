/** @type {import('houdini').ConfigFile} */
const config = {
	plugins: {
		'houdini-svelte': {
			client: './src/client.ts'
		}
	},
	watchSchema: {
		url: 'env:PUBLIC_GRAPHQL_URL',
		headers: {
			'Content-Type': 'application/json',
			Authorization(env) {
				return `${env.AUTH_SCHEME} ${Buffer.from(env.AUTH_TOKEN).toString('base64')}`
			}
		}
	},
	scalars: {
		// the name of the scalar we are configuring
		Timestamp: {
			// the corresponding typescript type
			type: 'string',
			// turn the api's response into that type
			unmarshal(val) {
				return val
			},
			// turn the value into something the API can use
			marshal(date) {
				return date
			}
		}
	},
	defaultCachePolicy: 'NetworkOnly'
};

export default config;
