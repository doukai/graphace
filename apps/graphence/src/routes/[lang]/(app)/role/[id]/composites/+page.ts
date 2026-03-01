import { redirect } from '@sveltejs/kit';
import { fetchQuery_role_compositesConnection_Store } from '~/lib/stores/query/query_role_compositesConnection_store';
import { createMutation_role_composites_Store } from '~/lib/stores/mutation/mutation_role_composites_store';
import { createMutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('Role');

	if (event.params.id && event.params.id !== '_') {
		return {
			id: event.params.id,
			query_role_compositesConnection_Store: await fetchQuery_role_compositesConnection_Store(event, { role_id: event.params.id, first: 10 }),
			mutation_role_composites_Store: createMutation_role_composites_Store(event),
			mutation_role_Store: createMutation_role_Store(event)
		};
	}
	const [, lang] = event.url.pathname.split('/');
	throw redirect(302, `/${lang}/role/_`);
}