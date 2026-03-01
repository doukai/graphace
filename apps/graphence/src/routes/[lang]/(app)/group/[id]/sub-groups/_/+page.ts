import { redirect } from '@sveltejs/kit';
import { createMutation_group_subGroups_Store } from '~/lib/stores/mutation/mutation_group_subGroups_store';
import { permissions } from '~/utils';
import type { PageLoad, PageLoadEvent } from './$types';

export const load: PageLoad = async (event: PageLoadEvent) => {
	await permissions.fetchPermissions('Group');

	if (event.params.id && event.params.id !== '_') {
		return {
			id: event.params.id,
			mutation_group_subGroups_Store: createMutation_group_subGroups_Store(event)
		};
	}
	const [, lang] = event.url.pathname.split('/');
	throw redirect(302, `/${lang}/group/_`);
}