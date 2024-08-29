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
		},
		interval: 0
	},
	scalars: {
		Timestamp: {
			type: 'string',
			unmarshal(val) {
				return val
			},
			marshal(date) {
				return date
			}
		},
		Upload: {
			type: 'string',
			unmarshal(val) {
				return val
			},
			marshal(date) {
				return date
			}
		}
	},
	defaultCachePolicy: 'NetworkOnly'
};

export default config;
