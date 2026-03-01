import { redirect } from '@sveltejs/kit';
import { fetchQuery_user_realm_Store } from '~/lib/stores/query/query_user_realm_store';
import { createMutation_user_realm_Store } from '~/lib/stores/mutation/mutation_user_realm_store';
import { createMutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('Realm');

	if (event.params.id && event.params.id !== '_') {
		return {
			id: event.params.id,
			query_user_realm_Store: await fetchQuery_user_realm_Store(event, { user_id: event.params.id }),
			mutation_user_realm_Store: createMutation_user_realm_Store(event),
			mutation_realm_Store: createMutation_realm_Store(event)
		};
	}
	const [, lang] = event.url.pathname.split('/');
	throw redirect(302, `/${lang}/user/_`);
}