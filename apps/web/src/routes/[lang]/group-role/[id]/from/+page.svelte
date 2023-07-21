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
	const Mutation_groupRole_from = new Mutation_groupRole_fromStore();
	const Mutation_group = new Mutation_groupStore();
	let errors: Record<number, Errors> = {};

	const mutation = (
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

	const mutation_group = (
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

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../group/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

{#if node}
	<GroupForm
		{node}
		{errors}
		isFetching={$Query_groupRole_from.fetching}
		on:mutation={mutation_group}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<GroupCreateForm
		{errors}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{/if}