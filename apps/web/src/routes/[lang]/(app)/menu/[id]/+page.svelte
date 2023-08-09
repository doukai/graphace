<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import MenuForm from '~/lib/components/objects/menu/MenuForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { Query_menuStore, Mutation_menuStore } from '$houdini';
	import type { PageData } from './$houdini';
	import type { MutationTypeMenuArgs, Menu } from '~/lib/types/schema';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: Query_menu = data.Query_menu as Query_menuStore;
	$: node = $Query_menu.data?.menu;
	$: urlName($page.url, node?.name || '');
	const Mutation_menu = new Mutation_menuStore();
	let errors: Record<string, Errors> = {};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeMenuArgs;
			update?: boolean;
			then: (data: Menu | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Menu', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				errors = {};
				Mutation_menu.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.menu);
						if (result.errors) {
							event.detail.catch(result.errors);
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

<MenuForm
	showBackButton={$canBack}
	{node}
	{errors}
	isFetching={$Query_menu.fetching}
	on:mutation={mutation}
	on:back={back}
	on:gotoField={gotoField}
/>
