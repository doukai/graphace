<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import PermissionForm from '~/lib/components/objects/permission/PermissionForm.svelte';
	import PermissionCreateForm from '~/lib/components/objects/permission/PermissionCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypePermissionArgs, Permission } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_subscriptionType_permissionStore, Mutation_subscriptionType_permissionStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: createNode = data.node as MutationTypePermissionArgs;
	$: createErrors = data.errors as Record<string, Errors>;

	$: Query_subscriptionType_permission = data.Query_subscriptionType_permission as Query_subscriptionType_permissionStore;
	$: subscriptionType = $Query_subscriptionType_permission.data?.subscriptionType;
	$: node = subscriptionType?.permission;
	const Mutation_subscriptionType_permission = new Mutation_subscriptionType_permissionStore();
	let errors: Record<number, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypePermissionArgs;
			update?: boolean;
			then: (data: Permission | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Permission', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_subscriptionType_permission.mutate({
					subscriptionType_: subscriptionType?.,
					subscriptionType_permission: event.detail.args,
					update: event.detail.update
				})
					.then((result) => {
						event.detail.then(result?.subscriptionType?.permission);
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
		to(`../../permission/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

{#if node}
	<PermissionForm
		{node}
		{errors}
		isFetching={$Query_subscriptionType_permission.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<PermissionCreateForm
		node={createNode}
		errors={createErrors}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{/if}