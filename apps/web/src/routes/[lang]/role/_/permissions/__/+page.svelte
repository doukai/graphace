<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons/types';
	import PermissionSelectConnectionTable from '~/lib/components/objects/permission/PermissionSelectConnectionTable.svelte';
	import type { Permission, QueryTypePermissionConnectionArgs, MutationTypePermissionArgs } from '~/lib/types/schema';
	import { Query_permissionConnectionStore, Mutation_permissionStore } from '$houdini';
	import { updateNodeParam, updateErrorsParam, getNodeParam, getErrorsParam } from '@graphace/commons/utils/url-util';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, 'permissions', PageType.SELECT);
	$: originalNodes = data.nodes as (MutationTypePermissionArgs | null | undefined)[];
	$: errors = data.errors as Record<number, Errors>;
	$: Query_permissionConnection = data.Query_permissionConnection as Query_permissionConnectionStore;
	$: nodes = $Query_permissionConnection.data?.permissionConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_permissionConnection.data?.permissionConnection?.totalCount || 0;
	const Mutation_permission = new Mutation_permissionStore();

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
		if (Array.isArray(event.detail.selected)) {
			ot({
				node: updateNodeParam($page.url, [...originalNodes, ...event.detail.selected.filter((item) => !originalNodes.map((node) => node?.id).includes(item?.id))]),
				errors: updateErrorsParam($page.url, errors)
			});
		}
	};

	const back = (event: CustomEvent<{}>) => {
		ot({
			node: getNodeParam($page.url),
			errors: getErrorsParam($page.url)
		});
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
