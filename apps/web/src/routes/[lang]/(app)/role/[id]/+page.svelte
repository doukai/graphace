<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Card } from '@graphace/ui';
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import type { GraphQLError } from '@graphace/graphql';
	import { Query_roleStore, Mutation_roleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationRoleArgs, Role } from '~/lib/types/schema';
	import { validateMutation } from '~/lib/utils';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_role = data.Query_role as Query_roleStore;
	$: node = $Query_role.data?.role;
	$: urlName($page.url, node?.name || '');
	const Mutation_role = new Mutation_roleStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationRoleArgs;
			then: (data: Role | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Role', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				Mutation_role.mutate(event.detail.args)
					.then((result) => {
						event.detail.then(result?.data?.role);
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
	<RoleForm
		showBackButton={$canBack}
		{node}
		{errors}
		isFetching={$Query_role.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
</Card>
