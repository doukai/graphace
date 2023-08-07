<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors } from '@graphace/commons/types';
	import RoleApiSelectConnectionTable from '~/lib/components/objects/role-api/RoleApiSelectConnectionTable.svelte';
	import type { RoleApi, QueryTypeRoleApiConnectionArgs, MutationTypeRoleApiArgs } from '~/lib/types/schema';
	import { Query_roleApiConnectionStore, Mutation_roleApiStore } from '$houdini';
	import { updateNodeParam, updateErrorsParam, getNodeParam, getErrorsParam } from '@graphace/commons/utils/url-util';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.roleApi.name(), PageType.SELECT);
	$: originalNodes = data.nodes as (MutationTypeRoleApiArgs | null | undefined)[];
	$: errors = data.errors as Record<number, Errors>;
	$: Query_roleApiConnection = data.Query_roleApiConnection as Query_roleApiConnectionStore;
	$: nodes = $Query_roleApiConnection.data?.roleApiConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_roleApiConnection.data?.roleApiConnection?.totalCount || 0;
	const Mutation_roleApi = new Mutation_roleApiStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleApiConnectionArgs;
			then: (data: (RoleApi | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_roleApiConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.roleApiConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleApiArgs;
			update?: boolean;
			then: (data: RoleApi | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('RoleApi', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_roleApi.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.roleApi);
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
			selected: MutationTypeRoleApiArgs | null | undefined | (MutationTypeRoleApiArgs | null | undefined)[];
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
<RoleApiSelectConnectionTable
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_roleApiConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
