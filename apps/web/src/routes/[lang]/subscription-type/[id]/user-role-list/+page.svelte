<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserRoleTable from '~/lib/components/objects/user-role/UserRoleTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeUserRoleArgs, QueryTypeUserRoleListArgs, UserRole } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_subscriptionType_userRoleListStore, Mutation_userRoleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_subscriptionType_userRoleList = data.Query_subscriptionType_userRoleList as Query_subscriptionType_userRoleListStore;
	$: subscriptionType = $Query_subscriptionType_userRoleList.data?.subscriptionType;
	$: nodes = $Query_subscriptionType_userRoleList.data?.subscriptionType?.userRoleList;
	const Mutation_userRole = new Mutation_userRoleStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeUserRoleListArgs;
			then: (data: (UserRole | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_subscriptionType_userRoleList.fetch({
			variables: { subscriptionType_id: { val: subscriptionType?. }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.subscriptionType?.userRoleList);
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeUserRoleArgs;
			update?: boolean;
			then: (data: UserRole | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.)?.indexOf(event.detail.args.);
		validate('SubscriptionType', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row) {
					errors[row].iterms = {};
				}
				Mutation_userRole.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.userRole);
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
		to(`../../user-role/${event.detail.id}`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, row)
		});
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./userRoleList/_`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, totalCount)
		});
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../user-role/${event.detail.path}`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<UserRoleTable
	{nodes}
	{errors}
	isFetching={$Query_subscriptionType_userRoleList.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:back={back}
/>
