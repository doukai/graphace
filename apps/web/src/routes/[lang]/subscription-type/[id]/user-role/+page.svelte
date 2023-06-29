<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserRoleForm from '~/lib/components/objects/user-role/UserRoleForm.svelte';
	import UserRoleCreateForm from '~/lib/components/objects/user-role/UserRoleCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeUserRoleArgs, UserRole } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_subscriptionType_userRoleStore, Mutation_subscriptionType_userRoleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: createNode = data.node as MutationTypeUserRoleArgs;
	$: createErrors = data.errors as Record<string, Errors>;

	$: Query_subscriptionType_userRole = data.Query_subscriptionType_userRole as Query_subscriptionType_userRoleStore;
	$: subscriptionType = $Query_subscriptionType_userRole.data?.subscriptionType;
	$: node = subscriptionType?.userRole;
	const Mutation_subscriptionType_userRole = new Mutation_subscriptionType_userRoleStore();
	let errors: Record<number, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserRoleArgs;
			update?: boolean;
			then: (data: UserRole | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('UserRole', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_subscriptionType_userRole.mutate({
					subscriptionType_: subscriptionType?.,
					subscriptionType_userRole: event.detail.args,
					update: event.detail.update
				})
					.then((result) => {
						event.detail.then(result?.subscriptionType?.userRole);
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
		to(`../../user-role/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

{#if node}
	<UserRoleForm
		{node}
		{errors}
		isFetching={$Query_subscriptionType_userRole.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<UserRoleCreateForm
		node={createNode}
		errors={createErrors}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{/if}