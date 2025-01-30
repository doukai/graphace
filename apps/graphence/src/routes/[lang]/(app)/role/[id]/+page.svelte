<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import type { Query_role_Store } from '~/lib/stores/query/query_role_store';
	import type { Mutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
	import type { GraphQLError } from '@graphace/graphql';
	import type { RoleInput, MutationRoleArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { validate } from '~/utils';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: query_role_Store = data.query_role_Store as Query_role_Store;
	$: node = $query_role_Store.response.data?.role;
	$: urlName($page.url, node?.name || '');
	$: mutation_role_Store = data.mutation_role_Store as Mutation_role_Store;
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationRoleArgs;
			then: (data: RoleInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_role_Arguments', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				mutation_role_Store.fetch(event.detail.args)
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.role);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./${event.detail.path}`);
	};
</script>

<Card>
	<RoleForm
		showBackButton={$canBack}
		{node}
		{errors}
		isFetching={$query_role_Store.isFetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
</Card>
