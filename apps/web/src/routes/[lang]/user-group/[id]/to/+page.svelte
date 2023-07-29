<script lang="ts">
	import { ot, to, canBack, urlName } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import GroupCreateForm from '~/lib/components/objects/group/GroupCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeGroupArgs, Group } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_userGroup_toStore, Mutation_userGroup_toStore, Mutation_groupStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	urlName($page.url, 'to');
	$: Query_userGroup_to = data.Query_userGroup_to as Query_userGroup_toStore;
	$: userGroup = $Query_userGroup_to.data?.userGroup;
	$: node = userGroup?.to;
	$: createNode = data.node;
	$: errors = data.errors as Record<string, Errors>;
	const Mutation_userGroup_to = new Mutation_userGroup_toStore();
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

	const parentMutation = (
		event: CustomEvent<{
			args: MutationTypeGroupArgs | null;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('UserGroup', { to: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_userGroup_to.mutate({
					userGroup_id: userGroup?.id,
					userGroup_to: event.detail.args,
					update: true
				})
					.then((result) => {
						event.detail.then(result?.data?.userGroup?.to);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.to.iterms;
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
		to(`./to/__`);
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
		isFetching={$Query_userGroup_to.fetching}
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