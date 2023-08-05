<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleMenuCreateForm from '~/lib/components/objects/role-menu/RoleMenuCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Mutation_role_roleMenuStore } from '$houdini';
	import type { MutationTypeRoleMenuArgs, RoleMenu } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.roleMenu.name(), PageType.CREATE);
	$: node = data.node as MutationTypeRoleMenuArgs;
	$: id = data.id as string;
	$: errors = data.errors as Record<string, Errors>;

	const Mutation_role_roleMenu = new Mutation_role_roleMenuStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleMenuArgs;
			update?: boolean;
			then: (data: RoleMenu | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Role', { roleMenu: [event.detail.args] }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_role_roleMenu.mutate({
					role_id: id,
					role_roleMenu: [event.detail.args],
					update: true,
					mergeToList: ['roleMenu']
				})
					.then((result) => {
						event.detail.then(undefined);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.roleMenu.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../../role-menu/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<RoleMenuCreateForm showBackButton={$canBack} {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
