<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import RoleCreateForm from '~/lib/components/objects/role/RoleCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeRoleArgs, Role } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_groupRole_toStore, Mutation_groupRole_toStore, Mutation_roleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	$: Query_groupRole_to = data.Query_groupRole_to as Query_groupRole_toStore;
	$: groupRole = $Query_groupRole_to.data?.groupRole;
	$: node = groupRole?.to;
	const Mutation_groupRole_to = new Mutation_groupRole_toStore();
	const Mutation_role = new Mutation_roleStore();
	let errors: Record<number, Errors> = {};

	const create = (
		event: CustomEvent<{
			args: MutationTypeRoleArgs;
			update?: boolean;
			then: (data: Role | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('GroupRole', { to: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_groupRole_to.mutate({
					groupRole_id: groupRole?.id,
					groupRole_to: event.detail.args,
					update: true
				})
					.then((result) => {
						event.detail.then(result?.data?.groupRole?.to);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.to.iterms;
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleArgs;
			update?: boolean;
			then: (data: Role | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Role', event.detail.args, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_role.mutate({ ...event.detail.args, update: true })
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
		isFetching={$Query_groupRole_to.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<RoleCreateForm
		{errors}
		on:mutation={create}
		on:back={back}
		on:gotoField={gotoField}
	/>
{/if}