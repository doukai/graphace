<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import GroupCreateForm from '~/lib/components/objects/group/GroupCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeGroupArgs, Group } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_userGroup_toStore, Mutation_userGroup_toStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: createNode = data.node as MutationTypeGroupArgs;
	$: createErrors = data.errors as Record<string, Errors>;

	$: Query_userGroup_to = data.Query_userGroup_to as Query_userGroup_toStore;
	$: userGroup = $Query_userGroup_to.data?.userGroup;
	$: node = userGroup?.to;
	const Mutation_userGroup_to = new Mutation_userGroup_toStore();
	let errors: Record<number, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeGroupArgs;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Group', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_userGroup_to.mutate({
					userGroup_id: userGroup?.id,
					userGroup_to: event.detail.args,
					update: event.detail.update
				})
					.then((result) => {
						event.detail.then(result?.userGroup?.to);
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
		isFetching={$Query_userGroup_to.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<GroupCreateForm
		node={createNode}
		errors={createErrors}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{/if}