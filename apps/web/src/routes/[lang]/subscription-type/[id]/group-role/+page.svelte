<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import GroupRoleForm from '~/lib/components/objects/group-role/GroupRoleForm.svelte';
	import GroupRoleCreateForm from '~/lib/components/objects/group-role/GroupRoleCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeGroupRoleArgs, GroupRole } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_subscriptionType_groupRoleStore, Mutation_subscriptionType_groupRoleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: createNode = data.node as MutationTypeGroupRoleArgs;
	$: createErrors = data.errors as Record<string, Errors>;

	$: Query_subscriptionType_groupRole = data.Query_subscriptionType_groupRole as Query_subscriptionType_groupRoleStore;
	$: subscriptionType = $Query_subscriptionType_groupRole.data?.subscriptionType;
	$: node = subscriptionType?.groupRole;
	const Mutation_subscriptionType_groupRole = new Mutation_subscriptionType_groupRoleStore();
	let errors: Record<number, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeGroupRoleArgs;
			update?: boolean;
			then: (data: GroupRole | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('GroupRole', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_subscriptionType_groupRole.mutate({
					subscriptionType_: subscriptionType?.,
					subscriptionType_groupRole: event.detail.args,
					update: event.detail.update
				})
					.then((result) => {
						event.detail.then(result?.subscriptionType?.groupRole);
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
		to(`../../group-role/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

{#if node}
	<GroupRoleForm
		{node}
		{errors}
		isFetching={$Query_subscriptionType_groupRole.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<GroupRoleCreateForm
		node={createNode}
		errors={createErrors}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{/if}