<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RealmForm from '~/lib/components/objects/realm/RealmForm.svelte';
	import RealmCreateForm from '~/lib/components/objects/realm/RealmCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeRealmArgs, Realm } from '~/lib/types/schema';
	import {
		updateNodeParam,
		updateErrorsParam,
		getChildPathParam
	} from '@graphace/commons/utils/url-util';
	import { Query_user_realmStore, Mutation_user_realmStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;

	$: Query_user_realm = data.Query_user_realm as Query_user_realmStore;
	$: user = $Query_user_realm.data?.user;
	$: node = user?.realm;
	const Mutation_user_realm = new Mutation_user_realmStore();
	let errors: Record<number, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRealmArgs | null;
			update?: boolean;
			then: (data: Realm | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('User', { realm: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_user_realm.mutate({
					user_id: user?.id,
					user_realm: event.detail.args,
					update: true
				})
					.then((result) => {
						event.detail.then(result?.data?.user?.realm);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.realm.iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../realm/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

{#if node}
	<RealmForm
		{node}
		{errors}
		isFetching={$Query_user_realm.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<RealmCreateForm {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
{/if}
