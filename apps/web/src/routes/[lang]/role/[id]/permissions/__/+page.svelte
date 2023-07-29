<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons/types';
	import PermissionSelectConnectionTable from '~/lib/components/objects/permission/PermissionSelectConnectionTable.svelte';
	import type { Permission, QueryTypePermissionConnectionArgs, MutationTypePermissionArgs } from '~/lib/types/schema';
	import { Query_permissionConnectionStore, Mutation_permissionStore, Mutation_role_permissionsStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	urlName($page.url, PageType.SELECT);
	$: id = data.id as string;
	$: Query_permissionConnection = data.Query_permissionConnection as Query_permissionConnectionStore;
	$: nodes = $Query_permissionConnection.data?.permissionConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_permissionConnection.data?.permissionConnection?.totalCount || 0;
	const Mutation_permission = new Mutation_permissionStore();
	const Mutation_role_permissions = new Mutation_role_permissionsStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypePermissionConnectionArgs;
			then: (data: (Permission | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_permissionConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.permissionConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypePermissionArgs;
			update?: boolean;
			then: (data: Permission | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('Permission', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_permission.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.permission);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};

	const select = (
		event: CustomEvent<{
			selected: MutationTypePermissionArgs | null | undefined | (MutationTypePermissionArgs | null | undefined)[];
			then: () => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Role', { permissions: event.detail.selected }, true, $locale)
			.then((data) => {
				errors = {};
				if (Array.isArray(event.detail.selected)) {
					Mutation_role_permissions.mutate({
						role_id: id,
						role_permissions: event.detail.selected,
						update: true,
						mergeToList: ['permissions']
					})
						.then((result) => {
							event.detail.then();
						})
						.catch((errors) => {
							event.detail.catch(errors);
						});
				}
			})
			.catch((validErrors) => {
				errors = validErrors.permissions.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>
<PermissionSelectConnectionTable
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_permissionConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
