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
		BigInteger: {
			type: 'number',
			unmarshal(val) {
				return val;
			},
			marshal(date) {
				return date;
			}
		},
		BigDecimal: {
			type: 'number',
			unmarshal(val) {
				return val;
			},
			marshal(date) {
				return date;
			}
		},
		DateTime: {
			type: 'string',
			unmarshal(val) {
				return val;
			},
			marshal(date) {
				return date;
			}
		},
		Date: {
			type: 'string',
			unmarshal(val) {
				return val;
			},
			marshal(date) {
				return date;
			}
		},
		Time: {
			type: 'string',
			unmarshal(val) {
				return val;
			},
			marshal(date) {
				return date;
			}
		},
		Timestamp: {
			type: 'string',
			unmarshal(val) {
				return val;
			},
			marshal(date) {
				return date;
			}
		},
		Upload: {
			type: 'string',
			unmarshal(val) {
				return val;
			},
			marshal(date) {
				return date;
			}
		}
	},
	defaultCachePolicy: 'NetworkOnly'
};

export default config;
