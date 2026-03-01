import { redirect } from '@sveltejs/kit';
import { createMutation_user_groups_Store } from '~/lib/stores/mutation/mutation_user_groups_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('Group');

	if (event.params.id && event.params.id !== '_') {
		return {
			id: event.params.id,
			mutation_user_groups_Store: createMutation_user_groups_Store(event)
		};
	}
	const [, lang] = event.url.pathname.split('/');
	throw redirect(302, `/${lang}/user/_`);
}