<script lang="ts">
	import { page } from '$app/stores';
	import { type Errors, updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack, PageType } from '@graphace/ui';
	import PermissionCreateForm from '~/lib/components/objects/permission/PermissionCreateForm.svelte';
	import type { Mutation_role_permissions_Store } from '~/lib/stores/mutation/mutation_role_permissions_store';
	import type { PermissionInput, MutationPermissionArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.permissions.name(), PageType.CREATE);
	$: node = data.node as MutationPermissionArgs;
	$: id = data.id as string;
	$: errors = data.errors as Record<string, Errors>;
	$: mutation_role_permissions_Store = data.mutation_role_permissions_Store as Mutation_role_permissions_Store;

	const mutation = (
		event: CustomEvent<{
			args: MutationPermissionArgs;
			then: (data: PermissionInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_role_Arguments', { id: id, permissions: [event.detail.args] }, $locale)
			.then((data) => {
				errors = {};
				mutation_role_permissions_Store.fetch({
					role_id: id,
					role_permissions: [event.detail.args]
				})
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(undefined);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.permissions.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../../permission/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<Card>
	<PermissionCreateForm 
		showBackButton={$canBack}
		{node}
		{errors}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
</Card>
