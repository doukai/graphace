<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleMenuCreateForm from '~/lib/components/objects/role-menu/RoleMenuCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { MutationTypeRoleMenuArgs, RoleMenu } from '~/lib/types/schema';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam, getNodeParam, getErrorsParam } from '@graphace/commons/utils/url-util';
	import type { PageData } from './$houdini';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.roleMenu.name(), PageType.CREATE);
	$: node = data.node as MutationTypeRoleMenuArgs;
	$: errors = data.errors as Record<string, Errors>;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleMenuArgs;
			then: (data: RoleMenu | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		ot({
			node: updateNodeParam($page.url, event.detail.args),
			errors: updateErrorsParam($page.url, errors)
		});
	};

	const back = (event: CustomEvent<{}>) => {
		ot({
			node: getNodeParam($page.url),
			errors: getErrorsParam($page.url)
		});
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
