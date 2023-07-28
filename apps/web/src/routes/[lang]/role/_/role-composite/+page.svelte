<script lang="ts">
	import { ot, to, urlName } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleCompositeCreateTable from '~/lib/components/objects/role-composite/RoleCompositeCreateTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeRoleCompositeArgs } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam, getNodeParam, getErrorsParam, getPathParam } from '@graphace/commons/utils/url-util';
	import type { PageData } from './$houdini';

	export let data: PageData;
	urlName($page.url, 'roleComposite');
	$: nodes = data.nodes as (MutationTypeRoleCompositeArgs | null | undefined)[];
	$: errors = data.errors as Record<number, Errors>;

	const edit = (
		event: CustomEvent<{
			row: number;
		}>
	) => {
		to(`./roleComposite/_`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.row)
		});
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./roleComposite/_`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, nodes.length)
		});
	};

	const mutation = (event: CustomEvent<{ nodes: (MutationTypeRoleCompositeArgs | null | undefined)[] | null | undefined}> ) => {
		nodes = [...event.detail.nodes || []];
	};

	const save = (event: CustomEvent<{ nodes: (MutationTypeRoleCompositeArgs | null | undefined)[] | null | undefined}> ) => {
		ot({
			node: updateNodeParam($page.url, event.detail.nodes),
			errors: updateErrorsParam($page.url, errors)
		});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../roleComposite/${event.detail.path}`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./roleComposite/__`, {
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
<RoleCompositeCreateTable
	showGotoSelectButton={true}
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
