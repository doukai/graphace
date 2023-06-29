<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RealmTable from '~/lib/components/objects/realm/RealmTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeRealmArgs, QueryTypeRealmListArgs, Realm } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_subscriptionType_realmListStore, Mutation_realmStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_subscriptionType_realmList = data.Query_subscriptionType_realmList as Query_subscriptionType_realmListStore;
	$: subscriptionType = $Query_subscriptionType_realmList.data?.subscriptionType;
	$: nodes = $Query_subscriptionType_realmList.data?.subscriptionType?.realmList;
	const Mutation_realm = new Mutation_realmStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRealmListArgs;
			then: (data: (Realm | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_subscriptionType_realmList.fetch({
			variables: { subscriptionType_id: { val: subscriptionType?. }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.subscriptionType?.realmList);
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRealmArgs;
			update?: boolean;
			then: (data: Realm | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.)?.indexOf(event.detail.args.);
		validate('SubscriptionType', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row) {
					errors[row].iterms = {};
				}
				Mutation_realm.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.realm);
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
		to(`../../realm/${event.detail.id}`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, row)
		});
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./realmList/_`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, totalCount)
		});
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../realm/${event.detail.path}`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<RealmTable
	{nodes}
	{errors}
	isFetching={$Query_subscriptionType_realmList.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:back={back}
/>
