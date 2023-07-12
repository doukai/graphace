<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import RoleCreateForm from '~/lib/components/objects/role/RoleCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeRoleArgs, Role } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_roleComposite_toStore, Mutation_roleComposite_toStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: createNode = data.node as MutationTypeRoleArgs;
	$: createErrors = data.errors as Record<string, Errors>;

	$: Query_roleComposite_to = data.Query_roleComposite_to as Query_roleComposite_toStore;
	$: roleComposite = $Query_roleComposite_to.data?.roleComposite;
	$: node = roleComposite?.to;
	const Mutation_roleComposite_to = new Mutation_roleComposite_toStore();
	let errors: Record<number, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleArgs;
			update?: boolean;
			then: (data: Role | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('role', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_roleComposite_to.mutate({
					roleComposite_id: roleComposite?.id,
					roleComposite_to: event.detail.args,
					update: event.detail.update
				})
					.then((result) => {
						event.detail.then(result?.data?.roleComposite?.to);
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
		to(`../../role/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

{#if node}
	<RoleForm
		{node}
		{errors}
		isFetching={$Query_roleComposite_to.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<RoleCreateForm
		node={createNode}
		errors={createErrors}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{/if}