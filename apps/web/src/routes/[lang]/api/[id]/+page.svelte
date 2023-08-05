<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import ApiForm from '~/lib/components/objects/api/ApiForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Query_apiStore, Mutation_apiStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeApiArgs, Api } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_api = data.Query_api as Query_apiStore;
	$: node = $Query_api.data?.api;
	$: urlName($page.url, node?.name || '');
	const Mutation_api = new Mutation_apiStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeApiArgs;
			update?: boolean;
			then: (data: Api | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Api', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_api.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.api);
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

<ApiForm
	showBackButton={$canBack}
	{node}
	{errors}
	isFetching={$Query_api.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
