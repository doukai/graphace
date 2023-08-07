<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Query_roleStore, Mutation_roleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeRoleArgs, Role } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_role = data.Query_role as Query_roleStore;
	$: node = $Query_role.data?.role;
	$: urlName($page.url, node?.name || '');
	const Mutation_role = new Mutation_roleStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleArgs;
			update?: boolean;
			then: (data: Role | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Role', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_role.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.role);
					})
					.catch((errors) => {
						event.detail.catch(errors);
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

<RoleForm
	showBackButton={$canBack}
	{node}
	{errors}
	isFetching={$Query_role.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
