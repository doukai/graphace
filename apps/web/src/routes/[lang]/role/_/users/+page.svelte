<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserCreateTable from '~/lib/components/objects/user/UserCreateTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { MutationTypeUserArgs } from '~/lib/types/schema';
	import {
		getNodeParam,
		updateNodeParam,
		getParentPathParam,
		getChildPathParam
	} from '~/lib/utils';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: nodes = data.nodes as (MutationTypeUserArgs | null | undefined)[] || [];

	const edit = (
		event: CustomEvent<{
			row: number;
		}>
	) => {
		to(`../../user/_`, {
			node: updateNodeParam($page.url, nodes),
			path: getChildPathParam($page.url, event.detail.row)
		});
	};

	const create = (event: CustomEvent<{}>) => {
		to(`../../user/_`, {
			node: updateNodeParam($page.url, {}),
			path: getChildPathParam($page.url, nodes.length)
		});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../user/${event.detail.path}`, {
			node: updateNodeParam($page.url, nodes),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};

	const back = (event: CustomEvent<{}>) => {
		ot({
			node: getNodeParam($page.url),
			path: getParentPathParam($page.url)
		});
	};
</script>
<UserCreateTable
	{nodes}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:back={back}
/>
