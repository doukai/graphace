<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RolePermissionCreateForm from '~/lib/components/objects/role-permission/RolePermissionCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Mutation_role_rolePermissionStore } from '$houdini';
	import type { MutationTypeRolePermissionArgs, RolePermission } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.rolePermission.name(), PageType.CREATE);
	$: node = data.node as MutationTypeRolePermissionArgs;
	$: id = data.id as string;
	$: errors = data.errors as Record<string, Errors>;

	const Mutation_role_rolePermission = new Mutation_role_rolePermissionStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRolePermissionArgs;
			update?: boolean;
			then: (data: RolePermission | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Role', { id: id, rolePermission: [event.detail.args] }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_role_rolePermission.mutate({
					role_id: id,
					role_rolePermission: [event.detail.args],
					update: true,
					mergeToList: ['rolePermission']
				})
					.then((result) => {
						event.detail.then(undefined);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.rolePermission.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../../role-permission/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<RolePermissionCreateForm showBackButton={$canBack} {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
