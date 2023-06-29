<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleCompositeTable from '~/lib/components/objects/role-composite/RoleCompositeTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeRoleCompositeArgs, QueryTypeRoleCompositeListArgs, RoleComposite } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_subscriptionType_roleCompositeListStore, Mutation_roleCompositeStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_subscriptionType_roleCompositeList = data.Query_subscriptionType_roleCompositeList as Query_subscriptionType_roleCompositeListStore;
	$: subscriptionType = $Query_subscriptionType_roleCompositeList.data?.subscriptionType;
	$: nodes = $Query_subscriptionType_roleCompositeList.data?.subscriptionType?.roleCompositeList;
	const Mutation_roleComposite = new Mutation_roleCompositeStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleCompositeListArgs;
			then: (data: (RoleComposite | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_subscriptionType_roleCompositeList.fetch({
			variables: { subscriptionType_id: { val: subscriptionType?. }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.subscriptionType?.roleCompositeList);
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleCompositeArgs;
			update?: boolean;
			then: (data: RoleComposite | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.)?.indexOf(event.detail.args.);
		validate('SubscriptionType', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row) {
					errors[row].iterms = {};
				}
				Mutation_roleComposite.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.roleComposite);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				if (row) {
					errors[row].iterms = validErrors;
				}
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		const row = nodes?.map((node) => node?.id).indexOf(event.detail.id) || totalCount;
		to(`../../role-composite/${event.detail.id}`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, row)
		});
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./roleCompositeList/_`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, totalCount)
		});
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../role-composite/${event.detail.path}`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<RoleCompositeTable
	{nodes}
	{errors}
	isFetching={$Query_subscriptionType_roleCompositeList.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:back={back}
/>
