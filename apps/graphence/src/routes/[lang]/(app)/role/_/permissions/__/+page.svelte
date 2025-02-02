<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { type Errors, type JsonSchema, updateNodeParam, updateErrorsParam, getNodeParam, getErrorsParam } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack, PageType } from '@graphace/ui';
	import PermissionSelectConnectionTable from '~/lib/components/objects/permission/PermissionSelectConnectionTable.svelte';
	import type { Query_permissionConnection_Store } from '~/lib/stores/query/query_permissionConnection_store';
	import type { Mutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
	import type { PermissionInput, QueryPermissionConnectionArgs, MutationPermissionArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');
		
	$: urlName($page.url, $LL.graphql.objects.Role.fields.permissions.name(), PageType.SELECT);
	$: originalNodes = data.nodes as (MutationPermissionArgs | null | undefined)[];
	$: errors = data.errors as Record<number, Errors>;
	$: query_permissionConnection_Store = data.query_permissionConnection_Store as Query_permissionConnection_Store;
	$: nodes = $query_permissionConnection_Store.response.data?.permissionConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_permissionConnection_Store.response.data?.permissionConnection?.totalCount || 0;
	$: mutation_permission_Store = data.mutation_permission_Store as Mutation_permission_Store;

	const fetch = (
		event: CustomEvent<{
			args: QueryPermissionConnectionArgs;
			then: (data: (PermissionInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		query_permissionConnection_Store.fetch(event.detail.args)
			.then((result) => {
				if (result.errors) {
					event.detail.catch(result.errors);
				} else {
					event.detail.then(result.data?.permissionConnection?.edges?.map((edge) => edge?.node));
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationPermissionArgs;
			then: (data: PermissionInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.name)?.indexOf(event.detail.args.name || event.detail.args.where?.name?.val || undefined);
		validate('Mutation_permission_Arguments', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				mutation_permission_Store.fetch(event.detail.args)
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.permission);
						}
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
			selected: PermissionInput | null | undefined | (PermissionInput | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
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

<Card>
	<PermissionSelectConnectionTable
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		isFetching={$query_permissionConnection_Store.isFetching}
		on:fetch={fetch}
		on:mutation={mutation}
		on:select={select}
		on:back={back}
	/>
</Card>
