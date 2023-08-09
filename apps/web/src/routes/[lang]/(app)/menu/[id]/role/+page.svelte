<script lang="ts">
	import { ot, to, canBack, urlName } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import RoleCreateForm from '~/lib/components/objects/role/RoleCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import type { MutationTypeRoleArgs, Role } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Query_menu_roleStore, Mutation_menu_roleStore, Mutation_roleStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Menu.fields.role.name());
	$: Query_menu_role = data.Query_menu_role as Query_menu_roleStore;
	$: menu = $Query_menu_role.data?.menu;
	$: node = menu?.role;
	$: createNode = data.node;
	$: errors = data.errors as Record<string, Errors>;
	const Mutation_menu_role = new Mutation_menu_roleStore();
	const Mutation_role = new Mutation_roleStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleArgs;
			update?: boolean;
			then: (data: Role | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Role', event.detail.args, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_role.mutate({ ...event.detail.args, update: true })
					.then((result) => {
						event.detail.then(result?.data?.role);
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
			args: MutationTypeRoleArgs | null;
			update?: boolean;
			then: (data: Role | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Menu', { role: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_menu_role.mutate({
					menu_id: menu?.id,
					menu_role: event.detail.args,
					update: true
				})
					.then((result) => {
						event.detail.then(result?.data?.menu?.role);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.role.iterms;
			});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		if (node) {
			to(`../../role/${event.detail.path}`);
		} else {
			to(`../../role/${event.detail.path}`, {
				node: updateNodeParam($page.url, createNode),
				errors: updateErrorsParam($page.url, errors),
				path: getChildPathParam($page.url, event.detail.name)
			});
		}
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./role/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>

{#if node}
	<RoleForm
		showGotoSelectButton={true}
		{node}
		{errors}
		showRemoveButton={false}
		showUnbindButton={true}
		showBackButton={$canBack}
		isFetching={$Query_menu_role.fetching}
		on:mutation={mutation}
		on:parentMutation={parentMutation}
		on:gotoField={gotoField}
		on:gotoSelect={gotoSelect}
		on:back={back}
	/>
{:else}
	<RoleCreateForm
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