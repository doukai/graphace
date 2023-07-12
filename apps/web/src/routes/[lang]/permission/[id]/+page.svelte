<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import PermissionForm from '~/lib/components/objects/permission/PermissionForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Query_permissionStore, Mutation_permissionStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypePermissionArgs, Permission } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_permission = data.Query_permission as Query_permissionStore;
	$: node = $Query_permission.data?.permission;
	const Mutation_permission = new Mutation_permissionStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypePermissionArgs;
			update?: boolean;
			then: (data: Permission | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('permission', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_permission.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.permission);
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
		to(`./${event.detail.path}`);
	};
</script>

<PermissionForm
	{node}
	{errors}
	isFetching={$Query_permission.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
