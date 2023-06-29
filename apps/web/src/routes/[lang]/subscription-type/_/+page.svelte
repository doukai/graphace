<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import SubscriptionTypeCreateForm from '~/lib/components/objects/subscription-type/SubscriptionTypeCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Mutation_subscriptionTypeStore } from '$houdini';
	import type { MutationTypeSubscriptionTypeArgs, SubscriptionType } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: node = data.node as MutationTypeSubscriptionTypeArgs;
	$: errors = data.errors as Record<number, Errors>;

	const Mutation_subscriptionType = new Mutation_subscriptionTypeStore();

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
		to(`./${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<SubscriptionTypeCreateForm {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
