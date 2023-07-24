<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import GroupCreateForm from '~/lib/components/objects/group/GroupCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeGroupArgs, Group } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_groupRole_fromStore, Mutation_groupRole_fromStore, Mutation_groupStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	$: Query_groupRole_from = data.Query_groupRole_from as Query_groupRole_fromStore;
	$: groupRole = $Query_groupRole_from.data?.groupRole;
	$: node = groupRole?.from;
	$: createNode = data.node;
	$: errors = data.errors as Record<string, Errors>;
	const Mutation_groupRole_from = new Mutation_groupRole_fromStore();
	const Mutation_group = new Mutation_groupStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeGroupArgs;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Group', event.detail.args, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_group.mutate({ ...event.detail.args, update: true })
					.then((result) => {
						event.detail.then(result?.data?.group);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};

	const createMutation = (
		event: CustomEvent<{
			args: MutationTypeGroupArgs;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('GroupRole', { from: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_groupRole_from.mutate({
					groupRole_id: groupRole?.id,
					groupRole_from: event.detail.args,
					update: true
				})
					.then((result) => {
						event.detail.then(result?.data?.groupRole?.from);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.from.iterms;
			});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		if (node) {
			to(`../../group/${event.detail.path}`);
		} else {
			to(`../../group/${event.detail.path}`, {
				node: updateNodeParam($page.url, createNode),
				errors: updateErrorsParam($page.url, errors),
				path: getChildPathParam($page.url, event.detail.name)
			});
		}
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./from/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>

{#if node}
	<GroupForm
		showGotoSelectButton={true}
		{node}
		{errors}
		isFetching={$Query_groupRole_from.fetching}
		on:mutation={mutation}
		on:gotoField={gotoField}
		on:gotoSelect={gotoSelect}
		on:back={back}
	/>
{:else}
	<GroupCreateForm
		showGotoSelectButton={true}
		node={createNode}
		{errors}
		on:mutation={createMutation}
		on:gotoField={gotoField}
		on:gotoSelect={gotoSelect}
		on:back={back}
	/>
{/if}