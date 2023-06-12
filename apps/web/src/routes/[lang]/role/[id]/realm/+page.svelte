<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RealmForm from '~/lib/components/objects/realm/RealmForm.svelte';
	import RealmCreateForm from '~/lib/components/objects/realm/RealmCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeRealmArgs, Realm } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_role_realmStore, Mutation_role_realmStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: createNode = data.node as MutationTypeRealmArgs;
	$: createErrors = data.errors as Record<string, Errors>;

	$: Query_role_realm = data.Query_role_realm as Query_role_realmStore;
	$: role = $Query_role_realm.data?.role;
	$: node = role?.realm;
	const Mutation_role_realm = new Mutation_role_realmStore();
	let errors: Record<number, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRealmArgs;
			update?: boolean;
			then: (data: Realm | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Realm', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_role_realm.mutate({
					role_id: role?.id,
					role_realm: event.detail.args,
					update: event.detail.update
				})
					.then((result) => {
						event.detail.then(result?.role?.realm);
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
		isFetching={$Query_role_realm.fetching}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{:else}
	<RealmCreateForm
		node={createNode}
		errors={createErrors}
		on:mutation={mutation}
		on:back={back}
		on:gotoField={gotoField}
	/>
{/if}