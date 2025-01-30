<script lang="ts">
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import PermissionForm from '~/lib/components/objects/permission/PermissionForm.svelte';
	import type { Query_permission_Store } from '~/lib/stores/query/query_permission_store';
	import type { Mutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
	import type { GraphQLError } from '@graphace/graphql';
	import type { PermissionInput, MutationPermissionArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { validate } from '~/utils';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: query_permission_Store = data.query_permission_Store as Query_permission_Store;
	$: node = $query_permission_Store.response.data?.permission;
	$: urlName($page.url, node?.name || '');
	$: mutation_permission_Store = data.mutation_permission_Store as Mutation_permission_Store;
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationPermissionArgs;
			then: (data: PermissionInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_permission_Arguments', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				mutation_permission_Store.fetch(event.detail.args)
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.permission);
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
	<PermissionForm
		showBackButton={$canBack}
		{node}
		{errors}
		isFetching={$query_permission_Store.isFetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
</Card>
