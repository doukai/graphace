<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import type { Errors, JsonSchema } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack, PageType } from '@graphace/ui';
	import RealmSelectConnectionTable from '~/lib/components/objects/realm/RealmSelectConnectionTable.svelte';
	import type { Query_realmConnection_Store } from '~/lib/stores/query/query_realmConnection_store';
	import type { Mutation_permission_realm_Store } from '~/lib/stores/mutation/mutation_permission_realm_store';
	import type { Mutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
	import type { RealmInput, QueryRealmConnectionArgs, MutationRealmArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');

	$: urlName($page.url, $LL.graphql.objects.Permission.fields.realm.name(), PageType.SELECT);
	$: name = data.name as string;
	$: query_realmConnection_Store = data.query_realmConnection_Store as Query_realmConnection_Store;
	$: nodes = $query_realmConnection_Store.response.data?.realmConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $query_realmConnection_Store.response.data?.realmConnection?.totalCount || 0;
	$: mutation_permission_realm_Store = data.mutation_permission_realm_Store as Mutation_permission_realm_Store;
	$: mutation_realm_Store = data.mutation_realm_Store as Mutation_realm_Store;
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryRealmConnectionArgs;
			then: (data: (RealmInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		query_realmConnection_Store.fetch(event.detail.args)
			.then((result) => {
				if (result.errors) {
					event.detail.catch(result.errors);
				} else {
					event.detail.then(result.data?.realmConnection?.edges?.map((edge) => edge?.node));
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationRealmArgs;
			then: (data: RealmInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id || event.detail.args.where?.id?.val || undefined);
		validate('Mutation_realm_Arguments', event.detail.args, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
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
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};

	const select = (
		event: CustomEvent<{
			selected: RealmInput | null | undefined | (RealmInput | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_permission_Arguments', { where: { name: { val: name } }, realm: event.detail.selected }, $locale)
			.then((data) => {
				errors = {};
				if (!Array.isArray(event.detail.selected)) {
					mutation_permission_realm_Store.fetch({
						permission_name: name,
						permission_realm: event.detail.selected
					})
						.then((result) => {
							if (result.errors) {
								event.detail.catch(result.errors);
							} else {
								event.detail.then();
							}
						});
				}
			})
			.catch((validErrors) => {
				errors = validErrors.realm.iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>

<Card>
	<RealmSelectConnectionTable
		multipleSelect={false}
		showBackButton={$canBack}
		{nodes}
		{totalCount}
		{errors}
		isFetching={$query_realmConnection_Store.isFetching}
		on:fetch={fetch}
		on:mutation={mutation}
		on:select={select}
		on:back={back}
	/>
</Card>
