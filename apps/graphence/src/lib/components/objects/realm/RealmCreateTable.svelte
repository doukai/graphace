<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import { Table, TableHead, TableEmpty, messageBoxs, z_index } from '@graphace/ui';
	import { ObjectTd, StringTh, StringTd } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash } from '@steeze-ui/heroicons';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { RealmInput } from '~/lib/types/schema';

	export let nodes: (RealmInput | null | undefined)[] | null | undefined = undefined;
	export let errors: Record<number, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showSaveButton: boolean = true;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');
	const z_class = z_index.top(1);
	const z_class2 = z_index.top(2);
	const z_class3 = z_index.top(3);

	const dispatch = createEventDispatcher<{
		edit: { row: number };
		create: {};
		mutation: { nodes: (RealmInput | null | undefined)[] | null | undefined };
		save: { nodes: (RealmInput | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	let selectAll: boolean;
	let selectedRowList: (number | undefined)[] = [];

	const removeRow = (row: number) => {
		nodes = [...(nodes || []).splice(row, 1)];
		dispatch('mutation', { nodes });
	};

	const removeRows = () => {
		nodes = [...(nodes || []).filter((_, index) => !selectedRowList.includes(index))];
		dispatch('mutation', { nodes });
		selectedRowList = [];
	};
</script>

<TableHead
	title={$LL.graphql.objects.Realm.name()}
	showRemoveButton={permissions.auth('Realm::*::WRITE') && showRemoveButton && selectedRowList.length > 0}
	showSaveButton={permissions.auth('Realm::*::WRITE') && showSaveButton}
	showGotoSelectButton={permissions.auth('Realm::*::WRITE') && showGotoSelectButton}
	{showBackButton}
	showSearchInput={false}
	on:create
	on:save={(e) => dispatch('save', { nodes })}
	on:remove={(e) => {
		messageBoxs.open({
			title: $LL.graphence.components.table.removeModalTitle(),
			buttonName: $LL.graphence.components.table.removeBtn(),
			buttonType: 'error',
			confirm: () => {
				removeRows();
				return true;
			}
		});
	}}
	on:gotoSelect
	on:back
/>
<div class="divider" />
<Table className="table-zebra table-pin-rows table-pin-cols md:table-sm">
	<thead>
		<tr class="{z_class2}">
			<th class="w-12">
				<label>
					<input
						type="checkbox"
						class="checkbox md:checkbox-sm"
						bind:checked={selectAll}
						on:change={(e) => {
							if (nodes && nodes.length > 0) {
								selectedRowList = selectAll ? nodes.map((node) => nodes?.indexOf(node)) : [];
							}
						}}
					/>
				</label>
			</th>
			{#if permissions.auth('Realm::name::*')}
			<td>{$LL.graphql.objects.Realm.fields.name.name()}</td>
			{/if}
			{#if permissions.auth('Realm::description::*')}
			<td>{$LL.graphql.objects.Realm.fields.description.name()}</td>
			{/if}
			<th />
		</tr>
	</thead>
	<tbody>
		{#if nodes && nodes.length > 0}
			{#each nodes as node, row}
				{#if node}
					<tr class="hover">
						<th class="{z_class} w-12">
							<label>
								<input type="checkbox" class="checkbox md:checkbox-sm" bind:group={selectedRowList} value={row} />
							</label>
						</th>
						{#if permissions.auth('Realm::name::*')}
						<StringTd
							name="name"
							bind:value={node.name}
							readonly={!permissions.auth('Realm::name::WRITE')}
							errors={errors?.[row]?.iterms?.name}
						/>
						{/if}
						{#if permissions.auth('Realm::description::*')}
						<StringTd
							name="description"
							bind:value={node.description}
							readonly={!permissions.auth('Realm::description::WRITE')}
							errors={errors?.[row]?.iterms?.description}
						/>
						{/if}
						{#if permissions.auth('Realm::*::WRITE')}
						<th class="{z_class} hover:{z_class3} w-24">
							<div class="flex space-x-1">
								<div class="tooltip" data-tip={$LL.graphence.components.table.editBtn()}>
									<button
										class="btn btn-square btn-ghost btn-xs"
										on:click|preventDefault={(e) => {
											dispatch('edit', { row });
										}}
									>
										<Icon src={PencilSquare} solid />
									</button>
								</div>
								<div class="tooltip" data-tip={$LL.graphence.components.table.removeBtn()}>
									<button
										class="btn btn-square btn-ghost btn-xs"
										on:click|preventDefault={(e) => {
											messageBoxs.open({
												title: $LL.graphence.components.table.removeModalTitle(),
												buttonName: $LL.graphence.components.table.removeBtn(),
												buttonType: 'error',
												confirm: () => {
													removeRow(row);
													return true;
												}
											});
										}}
									>
										<Icon src={Trash} solid />
									</button>
								</div>
							</div>
						</th>
						{/if}
					</tr>
				{/if}
			{/each}
		{:else}
			<TableEmpty cols={2 + 2}/>
		{/if}
	</tbody>
</Table>
