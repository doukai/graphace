/** @type {import('houdini').ConfigFile} */
const config = {
	apiUrl: 'http://localhost:8080/graphql',
	plugins: {
		'houdini-svelte': {
			client: './src/client.js'
		}
	}
};

export default config;
