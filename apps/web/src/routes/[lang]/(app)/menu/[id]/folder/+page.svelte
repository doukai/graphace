<script lang="ts">
	import { ot, to, canBack, urlName } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import MenuForm from '~/lib/components/objects/menu/MenuForm.svelte';
	import MenuCreateForm from '~/lib/components/objects/menu/MenuCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import type { MutationTypeMenuArgs, Menu } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_menu_folderStore, Mutation_menu_folderStore, Mutation_menuStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Menu.fields.folder.name());
	$: Query_menu_folder = data.Query_menu_folder as Query_menu_folderStore;
	$: menu = $Query_menu_folder.data?.menu;
	$: node = menu?.folder;
	$: createNode = data.node;
	$: errors = data.errors as Record<string, Errors>;
	const Mutation_menu_folder = new Mutation_menu_folderStore();
	const Mutation_menu = new Mutation_menuStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeMenuArgs;
			update?: boolean;
			then: (data: Menu | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Menu', event.detail.args, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_menu.mutate({ ...event.detail.args, update: true })
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

	const parentMutation = (
		event: CustomEvent<{
			args: MutationTypeMenuArgs | null;
			update?: boolean;
			then: (data: Menu | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Menu', { folder: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_menu_folder.mutate({
					menu_id: menu?.id,
					menu_folder: event.detail.args,
					update: true
				})
					.then((result) => {
						event.detail.then(result?.data?.menu?.folder);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.folder.iterms;
			});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		if (node) {
			to(`../../menu/${event.detail.path}`);
		} else {
			to(`../../menu/${event.detail.path}`, {
				node: updateNodeParam($page.url, createNode),
				errors: updateErrorsParam($page.url, errors),
				path: getChildPathParam($page.url, event.detail.name)
			});
		}
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./folder/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>

{#if node}
	<MenuForm
		showGotoSelectButton={true}
		{node}
		{errors}
		showRemoveButton={false}
		showUnbindButton={true}
		showBackButton={$canBack}
		isFetching={$Query_menu_folder.fetching}
		on:mutation={mutation}
		on:parentMutation={parentMutation}
		on:gotoField={gotoField}
		on:gotoSelect={gotoSelect}
		on:back={back}
	/>
{:else}
	<MenuCreateForm
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