<script lang="ts">
	import { ot, to, urlName } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons/types';
	import PermissionConnectionTable from '~/lib/components/objects/permission/PermissionConnectionTable.svelte';
	import type { Permission, QueryTypePermissionConnectionArgs, MutationTypePermissionArgs } from '~/lib/types/schema';
	import { Query_permissionConnectionStore, Mutation_permissionStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	urlName($page.url, 'Permission');
	$: Query_permissionConnection = data.Query_permissionConnection as Query_permissionConnectionStore;
	$: nodes = $Query_permissionConnection.data?.permissionConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_permissionConnection.data?.permissionConnection?.totalCount || 0;
	const Mutation_permission = new Mutation_permissionStore();
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

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`./permission/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./permission/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./permission/${event.detail.path}`);
	};
</script>
<PermissionConnectionTable
	showSaveButton={false}
	showBackButton={false}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_permissionConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
