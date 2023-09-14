<script lang="ts">
	import { ot, to, canBack, urlName } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RealmForm from '~/lib/components/objects/realm/RealmForm.svelte';
	import RealmCreateForm from '~/lib/components/objects/realm/RealmCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import type { MutationRealmArgs, Realm } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_user_realmStore, Mutation_user_realmStore, Mutation_realmStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.User.fields.realm.name());
	$: Query_user_realm = data.Query_user_realm as Query_user_realmStore;
	$: user = $Query_user_realm.data?.user;
	$: node = user?.realm;
	$: createNode = data.node;
	$: errors = data.errors as Record<string, Errors>;
	const Mutation_user_realm = new Mutation_user_realmStore();
	const Mutation_realm = new Mutation_realmStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationRealmArgs;
			then: (data: Realm | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Realm', event.detail.args, $locale)
			.then((data) => {
				errors = {};
				Mutation_realm.mutate(event.detail.args)
					.then((result) => {
						event.detail.then(result?.data?.realm);
						if (result.errors) {
							event.detail.catch(result.errors);
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
			then: (data: Realm | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('User', { id: user?.id, realm: event.detail.args }, $locale)
			.then((data) => {
				errors = {};
				Mutation_user_realm.mutate({
					user_id: user?.id,
					user_realm: event.detail.args
				})
					.then((result) => {
						event.detail.then(result?.data?.user?.realm);
						if (result.errors) {
							event.detail.catch(result.errors);
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

{#if node}
	<RealmForm
		showGotoSelectButton={true}
		{node}
		{errors}
		showRemoveButton={false}
		showUnbindButton={true}
		showBackButton={$canBack}
		isFetching={$Query_user_realm.fetching}
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