<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleCreateForm from '~/lib/components/objects/role/RoleCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type {
		MutationTypeRoleArgs,
		Role
	} from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam, getNodeParam, getErrorsParam, getPathParam } from '@graphace/commons/utils/url-util';
	import type { PageData } from './$houdini';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Menu.fields.role.name());
	$: node = data.node as MutationTypeRoleArgs;
	$: errors = data.errors as Record<string, Errors>;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleArgs;
			update?: boolean;
			then: (data: Role | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		node = event.detail.args;
	};

	const save = (event: CustomEvent<{}> ) => {
		ot({
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors)
		});
	};

	const back = (event: CustomEvent<{}>) => {
		ot({
			node: getNodeParam($page.url),
			errors: getErrorsParam($page.url)
		});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../role/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./role/__`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getPathParam($page.url)
		});
	};
</script>

<RoleCreateForm showGotoSelectButton={true} showBackButton={$canBack} {node} {errors} on:mutation={mutation} on:save={save} on:back={back} on:gotoField={gotoField} on:gotoSelect={gotoSelect} />