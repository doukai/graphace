<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleCreateTable from '~/lib/components/objects/role/RoleCreateTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { MutationTypeRoleArgs } from '~/lib/types/schema';
	import {
		updateNodeParam,
		getChildPathParam
	} from '~/lib/utils';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: nodes = data.nodes as (MutationTypeRoleArgs | null | undefined)[] || [];

	const edit = (
		event: CustomEvent<{
			row: number;
		}>
	) => {
		to(`../../role/_`, {
			node: updateNodeParam($page.url, nodes),
			path: getChildPathParam($page.url, event.detail.row)
		});
	};

	const create = (event: CustomEvent<{}>) => {
		to(`../../role/_`, {
			node: updateNodeParam($page.url, nodes),
			path: getChildPathParam($page.url, nodes.length)
		});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../role/${event.detail.path}`, {
			node: updateNodeParam($page.url, nodes),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};

	const save = (event: CustomEvent<{ nodes: (MutationTypeRoleArgs | null | undefined)[] | null | undefined}> ) => {
		ot({
			node: updateNodeParam($page.url, event.detail.nodes)
		});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>
<RoleCreateTable
	{nodes}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:save={save}
	on:back={back}
/>
