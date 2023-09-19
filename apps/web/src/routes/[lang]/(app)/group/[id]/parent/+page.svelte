<script lang="ts">
	import { ot, to, canBack, urlName } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import GroupCreateForm from '~/lib/components/objects/group/GroupCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import type { MutationGroupArgs, Group } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_group_parentStore, Mutation_group_parentStore, Mutation_groupStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Group.fields.parent.name());
	$: Query_group_parent = data.Query_group_parent as Query_group_parentStore;
	$: group = $Query_group_parent.data?.group;
	$: node = group?.parent;
	$: createNode = data.node;
	$: errors = data.errors as Record<string, Errors>;
	const Mutation_group_parent = new Mutation_group_parentStore();
	const Mutation_group = new Mutation_groupStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationGroupArgs;
			then: (data: Group | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Group', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				Mutation_group.mutate(event.detail.args)
					.then((result) => {
						event.detail.then(result?.data?.group);
						if (result.errors) {
							event.detail.catch(result.errors);
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
			then: (data: Group | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Group', { where: { id: { val: group?.id }}, parent: event.detail.args }, $locale)
			.then((data) => {
				errors = {};
				Mutation_group_parent.mutate({
					group_id: group?.id,
					group_parent: event.detail.args
				})
					.then((result) => {
						event.detail.then(result?.data?.group?.parent);
						if (result.errors) {
							event.detail.catch(result.errors);
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

{#if node}
	<GroupForm
		showGotoSelectButton={true}
		{node}
		{errors}
		showRemoveButton={false}
		showUnbindButton={true}
		showBackButton={$canBack}
		isFetching={$Query_group_parent.fetching}
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