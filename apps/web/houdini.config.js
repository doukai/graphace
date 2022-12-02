/** @type {import('houdini').ConfigFile} */
const config = {
	apiUrl: 'http://localhost:8080/graphql',
	plugins: {
		'houdini-svelte': {
			client: './src/client.js'
		}
	},
	scalars: {
		// the name of the scalar we are configuring
		Timestamp: {
			// the corresponding typescript type
			type: 'Date',
			// turn the api's response into that type
			unmarshal(val) {
				return new Date(val)
			},
			// turn the value into something the API can use
			marshal(date) {
				return date.getTime()
			}
		}
	},
	defaultCachePolicy: 'NetworkOnly'
};

export default config;
