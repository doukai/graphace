<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import SubscriptionTypeForm from '~/lib/components/objects/subscription-type/SubscriptionTypeForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Query_subscriptionTypeStore, Mutation_subscriptionTypeStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeSubscriptionTypeArgs, SubscriptionType } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: Query_subscriptionType = data.Query_subscriptionType as Query_subscriptionTypeStore;
	$: node = $Query_subscriptionType.data?.subscriptionType;
	const Mutation_subscriptionType = new Mutation_subscriptionTypeStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeSubscriptionTypeArgs;
			update?: boolean;
			then: (data: SubscriptionType | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('SubscriptionType', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_subscriptionType.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.subscriptionType);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./${event.detail.path}`);
	};
</script>

<SubscriptionTypeForm
	{node}
	{errors}
	isFetching={$Query_subscriptionType.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
