<script lang="ts">
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { type Errors, type JsonSchema, updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import RealmForm from '~/lib/components/objects/realm/RealmForm.svelte';
	import RealmCreateForm from '~/lib/components/objects/realm/RealmCreateForm.svelte';
	import type { Query_role_realm_Store } from '~/lib/stores/query/query_role_realm_store';
	import type { Mutation_role_realm_Store } from '~/lib/stores/mutation/mutation_role_realm_store';
	import type { Mutation_realm_Store } from '~/lib/stores/mutation/mutation_realm_store';
	import type { RealmInput, MutationRealmArgs } from '~/lib/types/schema';
	import type { PageData } from './$types';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	const { validate } = getContext<JsonSchema>('jsonSchema');

	$: urlName($page.url, $LL.graphql.objects.Role.fields.realm.name());
	$: query_role_realm_Store = data.query_role_realm_Store as Query_role_realm_Store;
	$: role = $query_role_realm_Store.response.data?.role;
	$: node = role?.realm;
	$: createNode = data.node;
	$: errors = data.errors as Record<string, Errors>;
	$: mutation_role_realm_Store = data.mutation_role_realm_Store as Mutation_role_realm_Store;
	$: mutation_realm_Store = data.mutation_realm_Store as Mutation_realm_Store;

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

	const parentMutation = (
		event: CustomEvent<{
			args: MutationRealmArgs | null;
			then: (data: RealmInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Mutation_role_Arguments', { where: { id: { val: role?.id } }, realm: event.detail.args }, $locale)
			.then((data) => {
				errors = {};
				mutation_role_realm_Store.fetch({
					role_id: role?.id,
					role_realm: event.detail.args
				})
					.then((result) => {
						if (result.errors) {
							event.detail.catch(result.errors);
						} else {
							event.detail.then(result?.data?.role?.realm);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.realm.iterms;
			});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		if (node) {
			to(`../../realm/${event.detail.path}`);
		} else {
			to(`../../realm/${event.detail.path}`, {
				node: updateNodeParam($page.url, createNode),
				errors: updateErrorsParam($page.url, errors),
				path: getChildPathParam($page.url, event.detail.name)
			});
		}
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./realm/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>

<Card>
	{#if node}
		<RealmForm
			showGotoSelectButton={true}
			{node}
			{errors}
			showRemoveButton={false}
			showUnbindButton={true}
			showBackButton={$canBack}
			isFetching={$query_role_realm_Store.isFetching}
			on:mutation={mutation}
			on:parentMutation={parentMutation}
			on:gotoField={gotoField}
			on:gotoSelect={gotoSelect}
			on:back={back}
		/>
	{:else}
		<RealmCreateForm
			showGotoSelectButton={true}
			showBackButton={$canBack}
			node={createNode}
			{errors}
			on:mutation={parentMutation}
			on:gotoField={gotoField}
			on:gotoSelect={gotoSelect}
			on:back={back}
		/>
	{/if}
</Card>