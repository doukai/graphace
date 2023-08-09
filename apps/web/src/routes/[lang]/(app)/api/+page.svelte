<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import ApiConnectionTable from '~/lib/components/objects/api/ApiConnectionTable.svelte';
	import type { Api, QueryTypeApiConnectionArgs, MutationTypeApiArgs } from '~/lib/types/schema';
	import { Query_apiConnectionStore, Mutation_apiStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Api.name());
	$: Query_apiConnection = data.Query_apiConnection as Query_apiConnectionStore;
	$: nodes = $Query_apiConnection.data?.apiConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_apiConnection.data?.apiConnection?.totalCount || 0;
	const Mutation_api = new Mutation_apiStore();
	let errors: Record<number, Errors> = {};

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

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`./api/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./api/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./api/${event.detail.path}`);
	};
</script>
<ApiConnectionTable
	showSaveButton={false}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_apiConnection.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
