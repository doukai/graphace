<script lang="ts">
	import { page } from '$app/stores';
	import { type Errors, updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import GroupCreateForm from '~/lib/components/objects/group/GroupCreateForm.svelte';
	import type { Query_group_parent_Store } from '~/lib/stores/query/query_group_parent_store';
	import type { Mutation_group_parent_Store } from '~/lib/stores/mutation/mutation_group_parent_store';
	import type { Mutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
	import type { GroupInput, MutationGroupArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { validate } from '~/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Group.fields.parent.name());
	$: query_group_parent_Store = data.query_group_parent_Store as Query_group_parent_Store;
	$: group = $query_group_parent_Store.response.data?.group;
	$: node = group?.parent;
	$: createNode = data.node;
	$: errors = data.errors as Record<string, Errors>;
	$: mutation_group_parent_Store = data.mutation_group_parent_Store as Mutation_group_parent_Store;
	$: mutation_group_Store = data.mutation_group_Store as Mutation_group_Store;

	const mutation = (
		event: CustomEvent<{
			args: MutationGroupArgs;
			then: (data: GroupInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_group_Arguments', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				mutation_group_Store.fetch(event.detail.args)
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.group);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};

	const parentMutation = (
		event: CustomEvent<{
			args: MutationGroupArgs | null;
			then: (data: GroupInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_group_Arguments', { where: { id: { val: group?.id } }, parent: event.detail.args }, $locale)
			.then((data) => {
				errors = {};
				mutation_group_parent_Store.fetch({
					group_id: group?.id,
					...event.detail.args
				})
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.group?.parent);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.parent.iterms;
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
		to(`./parent/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>

<Card>
	{#if node}
		<GroupForm
			showGotoSelectButton={true}
			{node}
			{errors}
			showRemoveButton={false}
			showUnbindButton={true}
			showBackButton={$canBack}
			isFetching={$query_group_parent_Store.isFetching}
			on:mutation={mutation}
			on:parentMutation={parentMutation}
			on:gotoField={gotoField}
			on:gotoSelect={gotoSelect}
			on:back={back}
		/>
	{:else}
		<GroupCreateForm
			showGotoSelectButton={true}
			showBackButton={$canBack}
			node={createNode}
			{errors}
			on:mutation={parentMutation}
			on:gotoField={gotoField}
			on:gotoSelect={gotoSelect}
			on:back={back}
		/>
	{/if}
</Card>