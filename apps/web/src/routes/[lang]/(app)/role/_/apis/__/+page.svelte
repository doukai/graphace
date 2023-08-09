<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import ApiSelectConnectionTable from '~/lib/components/objects/api/ApiSelectConnectionTable.svelte';
	import type { Api, QueryTypeApiConnectionArgs, MutationTypeApiArgs } from '~/lib/types/schema';
	import { Query_apiConnectionStore, Mutation_apiStore } from '$houdini';
	import { updateNodeParam, updateErrorsParam, getNodeParam, getErrorsParam } from '@graphace/commons/utils/url-util';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.apis.name(), PageType.SELECT);
	$: originalNodes = data.nodes as (MutationTypeApiArgs | null | undefined)[];
	$: errors = data.errors as Record<number, Errors>;
	$: Query_apiConnection = data.Query_apiConnection as Query_apiConnectionStore;
	$: nodes = $Query_apiConnection.data?.apiConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_apiConnection.data?.apiConnection?.totalCount || 0;
	const Mutation_api = new Mutation_apiStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeApiConnectionArgs;
			then: (data: (Api | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_apiConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.apiConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeApiArgs;
			update?: boolean;
			then: (data: Api | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validate('Api', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_api.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.api);
						if (result.errors) {
							event.detail.catch(result.errors);
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
			selected: MutationTypeApiArgs | null | undefined | (MutationTypeApiArgs | null | undefined)[];
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
<ApiSelectConnectionTable
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_apiConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:select={select}
	on:back={back}
/>
