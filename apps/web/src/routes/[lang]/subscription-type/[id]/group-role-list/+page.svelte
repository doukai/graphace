<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import GroupRoleTable from '~/lib/components/objects/group-role/GroupRoleTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeGroupRoleArgs, QueryTypeGroupRoleListArgs, GroupRole } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_subscriptionType_groupRoleListStore, Mutation_groupRoleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_subscriptionType_groupRoleList = data.Query_subscriptionType_groupRoleList as Query_subscriptionType_groupRoleListStore;
	$: subscriptionType = $Query_subscriptionType_groupRoleList.data?.subscriptionType;
	$: nodes = $Query_subscriptionType_groupRoleList.data?.subscriptionType?.groupRoleList;
	const Mutation_groupRole = new Mutation_groupRoleStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeGroupRoleListArgs;
			then: (data: (GroupRole | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_subscriptionType_groupRoleList.fetch({
			variables: { subscriptionType_id: { val: subscriptionType?. }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.subscriptionType?.groupRoleList);
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeGroupRoleArgs;
			update?: boolean;
			then: (data: GroupRole | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.)?.indexOf(event.detail.args.);
		validate('SubscriptionType', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row) {
					errors[row].iterms = {};
				}
				Mutation_groupRole.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.groupRole);
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
		to(`../../group-role/${event.detail.id}`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, row)
		});
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./groupRoleList/_`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, totalCount)
		});
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../group-role/${event.detail.path}`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<GroupRoleTable
	{nodes}
	{errors}
	isFetching={$Query_subscriptionType_groupRoleList.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:back={back}
/>
