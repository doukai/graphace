<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Card } from '@graphace/ui';
	import PermissionForm from '~/lib/components/objects/permission/PermissionForm.svelte';
	import type { GraphQLError } from '@graphace/graphql';
	import { Query_permissionStore, Mutation_permissionStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationPermissionArgs, Permission } from '~/lib/types/schema';
	import { validateMutation } from '~/lib/utils';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_permission = data.Query_permission as Query_permissionStore;
	$: node = $Query_permission.data?.permission;
	$: urlName($page.url, node?.name || '');
	const Mutation_permission = new Mutation_permissionStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationPermissionArgs;
			then: (data: Permission | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Permission', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				Mutation_permission.mutate(event.detail.args)
					.then((result) => {
						event.detail.then(result?.data?.permission);
						if (result.errors) {
							event.detail.catch(result.errors);
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
		isFetching={$Query_permission.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
</Card>
