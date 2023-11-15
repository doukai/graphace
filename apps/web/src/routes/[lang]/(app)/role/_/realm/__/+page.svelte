<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import { type Errors, updateNodeParam, updateErrorsParam, getNodeParam, getErrorsParam } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card } from '@graphace/ui';
	import RealmSelectConnectionTable from '~/lib/components/objects/realm/RealmSelectConnectionTable.svelte';
	import type { Realm, QueryRealmConnectionArgs, MutationRealmArgs } from '~/lib/types/schema';
	import { Query_realmConnectionStore, Mutation_realmStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import { locale } from '$i18n/i18n-svelte';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.realm.name(), PageType.SELECT);
	$: errors = data.errors as Record<number, Errors>;
	$: Query_realmConnection = data.Query_realmConnection as Query_realmConnectionStore;
	$: nodes = $Query_realmConnection.data?.realmConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_realmConnection.data?.realmConnection?.totalCount || 0;
	const Mutation_realm = new Mutation_realmStore();

	const fetch = (
		event: CustomEvent<{
			args: QueryRealmConnectionArgs;
			then: (data: (Realm | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_realmConnection.fetch({ variables: event.detail.args })
			.then((result) => {
				event.detail.then(result.data?.realmConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationRealmArgs;
			then: (data: Realm | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id || event.detail.args.where?.id?.val || undefined);
		validateMutation('Realm', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_realm.mutate(event.detail.args)
					.then((result) => {
						event.detail.then(result?.data?.realm);
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

	const select = (
		event: CustomEvent<{
			selected: MutationRealmArgs | null | undefined | (MutationRealmArgs | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		if (!Array.isArray(event.detail.selected)) {
			ot({
				node: updateNodeParam($page.url, event.detail.selected),
				errors: updateErrorsParam($page.url, errors)
			});
		}
	};

	const back = (event: CustomEvent<{}>) => {
		ot({
			node: getNodeParam($page.url),
			errors: getErrorsParam($page.url)
		});
	};
</script>

<Card>
	<RealmSelectConnectionTable
		multipleSelect={false}
		mutate={false}
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		isFetching={$Query_realmConnection.fetching}
		on:fetch={fetch}
		on:mutation={mutation}
		on:select={select}
		on:back={back}
	/>
</Card>
