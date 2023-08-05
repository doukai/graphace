<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import ApiConnectionTable from '~/lib/components/objects/api/ApiConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeApiArgs, QueryTypeApiConnectionArgs, Api } from '~/lib/types/schema';
	import { Query_role_apisStore, Mutation_apiStore, Mutation_role_apisStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.apis.name());
	$: id = data.id as string;
	$: Query_role_apis = data.Query_role_apis as Query_role_apisStore;
	$: role = $Query_role_apis.data?.role;
	$: nodes = $Query_role_apis.data?.role?.apisConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_role_apis.data?.role?.apisConnection?.totalCount || 0;
	const Mutation_api = new Mutation_apiStore();
	const Mutation_role_apis = new Mutation_role_apisStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeApiConnectionArgs;
			then: (data: (Api | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_role_apis.fetch({
			variables: { role_id: { val: role?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.role?.apisConnection?.edges?.map((edge) => edge?.node));
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeApiArgs;
			update?: boolean;
			then: (data: Api | null | undefined) => void;
			catch: (errors: Errors) => void;
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

	const parentMutation = (
		event: CustomEvent<{
			args: MutationTypeApiArgs[];
			update?: boolean;
			then: (data: Api[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Role', { apis: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_role_apis.mutate({
					role_id: id,
					role_apis: event.detail.args,
					update: true,
					mergeToList: ['apis']
				})
					.then((result) => {
						event.detail.then(undefined);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.apis.iterms;
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`../../api/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./apis/_`);
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../api/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./apis/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<ApiConnectionTable
	showSaveButton={false}
	showRemoveButton={false}
	showUnbindButton={true}
	showGotoSelectButton={true}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_role_apis.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
