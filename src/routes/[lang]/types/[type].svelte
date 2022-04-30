<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { TypeManager } from '$lib/TypeManager';
	const manager: TypeManager = new TypeManager();
	export const load: Load = async ({ params }) => {
		const { type } = params;
		return {
			props: { typeName: manager.urlToTypeName(type) }
		};
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import type { __Type } from '$lib/types/__Type';
	import { getType } from '$lib/graphql/Introspection';
	import type { QueryParams } from '$lib/graphql/Type';
	import { removeTypes } from '$lib/graphql/Type';
	import TypeTable from '$lib/components/graphql/introspection/table/TypeTable.svelte';
	import { SectionHead, SectionLoading } from '$lib/components/ui/section';
	import SearchInput from '$lib/components/ui/search/SearchInput.svelte';
	import { notifications } from '$lib/stores/Notifications';
	import { messageBox } from '$lib/stores/MessageBox';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Trash } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	export let typeName: string;

	$: typePromise = getType(typeName);
	let refresh: (params: QueryParams) => void;

	let queryValue: string = null;
	let search = (event: CustomEvent<{ value: string }>) => {
		queryValue = event.detail.value;
	};

	let showDeleteButton = false;
	let idList: string[] = [];

	const selectChange = (event: CustomEvent<{ selectedIdList: string[] }>) => {
		idList = event.detail.selectedIdList;
		if (event.detail.selectedIdList.length > 0) {
			showDeleteButton = true;
		} else {
			showDeleteButton = false;
		}
	};

	const removeRows = (__type: __Type) => {
		removeTypes(__type, idList)
			.then((response) => {
				notifications.success($LL.message.removeSuccess());
				refresh({ __type });
			})
			.catch((error) => {
				notifications.error($LL.message.removeFailed());
			});
	};
</script>

{#await typePromise}
	<SectionLoading />
{:then response}
	<SectionHead title={response.__type.name}>
		<SearchInput on:search={search} />
		{#if showDeleteButton}
			<div class="tooltip tooltip-bottom" data-tip={$LL.components.graphql.table.removeBtn()}>
				<button
					class="btn btn-error btn-outline btn-square"
					on:click={(e) => {
						e.preventDefault();
						messageBox.open({
							title: $LL.components.graphql.table.removeModalTitle(),
							buttonName: $LL.components.graphql.table.removeBtn(),
							buttonType: 'error',
							confirm: () => {
								removeRows(response.__type);
								return true;
							}
						});
					}}
				>
					<Icon src={Trash} class="h-6 w-6" solid />
				</button>
			</div>
		{/if}
		<button
			class="btn"
			on:click={(e) => {
				e.preventDefault();
				goto(`./${response.__type.name}/create`);
			}}
		>
			{$LL.components.routers.type.create()}
		</button>
	</SectionHead>
	<div class="divider" />
	<TypeTable __type={response.__type} {queryValue} on:selectChange={selectChange} bind:refresh />
{/await}
