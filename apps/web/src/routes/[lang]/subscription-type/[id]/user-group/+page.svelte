<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserGroupForm from '~/lib/components/objects/user-group/UserGroupForm.svelte';
	import UserGroupCreateForm from '~/lib/components/objects/user-group/UserGroupCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeUserGroupArgs, UserGroup } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_subscriptionType_userGroupStore, Mutation_subscriptionType_userGroupStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: createNode = data.node as MutationTypeUserGroupArgs;
	$: createErrors = data.errors as Record<string, Errors>;

	$: Query_subscriptionType_userGroup = data.Query_subscriptionType_userGroup as Query_subscriptionType_userGroupStore;
	$: subscriptionType = $Query_subscriptionType_userGroup.data?.subscriptionType;
	$: node = subscriptionType?.userGroup;
	const Mutation_subscriptionType_userGroup = new Mutation_subscriptionType_userGroupStore();
	let errors: Record<number, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserGroupArgs;
			update?: boolean;
			then: (data: UserGroup | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('UserGroup', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_subscriptionType_userGroup.mutate({
					subscriptionType_: subscriptionType?.,
					subscriptionType_userGroup: event.detail.args,
					update: event.detail.update
				})
					.then((result) => {
						event.detail.then(result?.subscriptionType?.userGroup);
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
		to(`../../user-group/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

{#if node}
	<UserGroupForm
		{node}
		{errors}
		isFetching={$Query_subscriptionType_userGroup.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<UserGroupCreateForm
		node={createNode}
		errors={createErrors}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{/if}