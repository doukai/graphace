import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { locale, LL, jwt } }) => {
	console.info(LL.log({ fileName: '+layout.server.ts' }));

	// pass locale information from "server-context" to "shared server + client context"
	return { locale, jwt };
}