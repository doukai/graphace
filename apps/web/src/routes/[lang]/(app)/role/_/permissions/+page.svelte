<script lang="ts">
	import { ot, to, canBack, urlName } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import { type Errors, updateNodeParam, updateErrorsParam, getChildPathParam, getNodeParam, getErrorsParam, getPathParam } from '@graphace/commons';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Card } from '@graphace/ui';
	import PermissionCreateTable from '~/lib/components/objects/permission/PermissionCreateTable.svelte';
	import type { MutationPermissionArgs } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.permissions.name());
	$: nodes = data.nodes as (MutationPermissionArgs | null | undefined)[];
	$: errors = data.errors as Record<number, Errors>;

	const edit = (
		event: CustomEvent<{
			row: number;
		}>
	) => {
		to(`./permissions/_`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.row)
		});
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./permissions/_`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, nodes.length)
		});
	};

	const mutation = (event: CustomEvent<{ nodes: (MutationPermissionArgs | null | undefined)[] | null | undefined}> ) => {
		nodes = [...event.detail.nodes || []];
	};

	const save = (event: CustomEvent<{ nodes: (MutationPermissionArgs | null | undefined)[] | null | undefined}> ) => {
		ot({
			node: updateNodeParam($page.url, event.detail.nodes),
			errors: updateErrorsParam($page.url, errors)
		});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../permission/${event.detail.path}`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./permissions/__`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getPathParam($page.url)
		});
	};

	const back = (event: CustomEvent<{}>) => {
		ot({
			node: getNodeParam($page.url),
			errors: getErrorsParam($page.url)
		});
	};
</script>

<Card>
	<PermissionCreateTable
		showGotoSelectButton={true}
		showBackButton={$canBack}
		{nodes}
		{errors}
		on:edit={edit}
		on:create={create}
		on:mutation={mutation}
		on:save={save}
		on:gotoField={gotoField}
		on:gotoSelect={gotoSelect}
		on:back={back}
	/>
</Card>
