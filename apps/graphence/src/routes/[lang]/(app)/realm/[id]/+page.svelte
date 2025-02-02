<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import type { Errors, JsonSchema } from '@graphace/commons';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import RealmForm from '~/lib/components/objects/realm/RealmForm.svelte';
	import type { Query_realm_Store } from '~/lib/stores/query/query_realm_store';
	import type { Mutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
	import type { GraphQLError } from '@graphace/graphql';
	import type { RealmInput, MutationRealmArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');

	$: query_realm_Store = data.query_realm_Store as Query_realm_Store;
	$: node = $query_realm_Store.response.data?.realm;
	$: urlName($page.url, node?.name || '');
	$: mutation_realm_Store = data.mutation_realm_Store as Mutation_realm_Store;
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationRealmArgs;
			then: (data: RealmInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_realm_Arguments', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				mutation_realm_Store.fetch(event.detail.args)
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.realm);
						}
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

<Card>
	<RealmForm
		showBackButton={$canBack}
		{node}
		{errors}
		isFetching={$query_realm_Store.isFetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
</Card>
