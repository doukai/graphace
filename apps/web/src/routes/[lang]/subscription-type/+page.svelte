<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import type { Errors } from '@graphace/commons/types';
	import SubscriptionTypeTable from '~/lib/components/objects/subscription-type/SubscriptionTypeTable.svelte';
	import type { SubscriptionType, QueryTypeSubscriptionTypeListArgs, MutationTypeSubscriptionTypeArgs } from '~/lib/types/schema';
	import { Query_subscriptionTypeListStore, Mutation_subscriptionTypeStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_subscriptionTypeList = data.Query_subscriptionTypeList as Query_subscriptionTypeListStore;
	$: nodes = $Query_subscriptionTypeList.data?.subscriptionTypeList;
	const Mutation_subscriptionType = new Mutation_subscriptionTypeStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeSubscriptionTypeListArgs;
			then: (data: (SubscriptionType | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		Query_subscriptionTypeList.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.subscriptionTypeList);
			})
			.catch((errors) => {
				event.detail.catch(errors);
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeSubscriptionTypeArgs;
			update?: boolean;
			then: (data: SubscriptionType | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.)?.indexOf(event.detail.args.);
		validate('SubscriptionType', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row) {
					errors[row].iterms = {};
				}
				Mutation_subscriptionType.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.subscriptionType);
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
		to(`./subscription-type/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./subscription-type/_`);
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./subscription-type/${event.detail.path}`);
	};
</script>
	{nodes}
	{errors}
	isFetching={$Query_subscriptionTypeList.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
/>
