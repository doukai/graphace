<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons/types';
	import { ObjectTd, IDTh, IDTd, StringTh, StringTd } from '@graphace/ui-graphql/components/table';
	import PermissionTypeTh from '~/lib/components/enums/permission-type/PermissionTypeTh.svelte';
	import PermissionTypeTd from '~/lib/components/enums/permission-type/PermissionTypeTd.svelte';
	import { Table, TableHead, TableEmpty } from '@graphace/ui/components/table';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type { PermissionInput } from '~/lib/types/schema';

	export let nodes: (PermissionInput | null | undefined)[] | null | undefined;
	export let errors: Record<number, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showSaveButton: boolean = true;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		edit: { row: number };
		create: {};
		mutation: { nodes: (PermissionInput | null | undefined)[] | null | undefined };
		save: { nodes: (PermissionInput | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	let selectAll: boolean;
	let selectedRowList: (number | undefined)[] = [];

	const removeRow = (row: number) => {
		nodes?.splice(row, 1);
		dispatch('mutation', { nodes });
	};

	const removeRows = () => {
		dispatch('mutation', {
			nodes: nodes?.filter((_, index) => !selectedRowList.includes(index))
		});
		selectedRowList = [];
	};
</script>

<TableHead
	title={$LL.graphql.objects.Permission.name()}
	showRemoveButton={showRemoveButton && selectedRowList.length > 0}
	{showSaveButton}
	{showBackButton}
	{showGotoSelectButton}
	showSearchInput={false}
	on:create
	on:save={() => dispatch('save', { nodes })}
	on:remove={() => {
		messageBoxs.open({
			title: $LL.web.components.table.removeModalTitle(),
			buttonName: $LL.web.components.table.removeBtn(),
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
<Table>
	<thead>
		<tr>
			<th class="z-20 w-12">
				<label>
					<input
						type="checkbox"
						class="checkbox"
						bind:checked={selectAll}
						on:change={() => {
							if (nodes && nodes.length > 0) {
								selectedRowList = selectAll ? nodes.map((node) => nodes?.indexOf(node)) : [];
							}
						}}
					/>
				</label>
			</th>
			<td>{$LL.graphql.objects.Permission.fields.name.name()}</td>
			<td>{$LL.graphql.objects.Permission.fields.field.name()}</td>
			<td>{$LL.graphql.objects.Permission.fields.type.name()}</td>
			<td>{$LL.graphql.objects.Permission.fields.permissionType.name()}</td>
			<td>{$LL.graphql.objects.Permission.fields.description.name()}</td>
			<td>{$LL.graphql.objects.Permission.fields.roles.name()}</td>
			<td>{$LL.graphql.objects.Permission.fields.realm.name()}</td>
			<th />
		</tr>
	</thead>
	<tbody>
		{#if nodes && nodes.length > 0}
			{#each nodes as node, row}
				{#if node}
					<tr class="hover">
						<th class="z-20 w-12">
							<label>
								<input type="checkbox" class="checkbox" bind:group={selectedRowList} value={row} />
							</label>
						</th>
						<IDTd
							name="name"
							bind:value={node.name}
							readonly
							errors={errors[row]?.iterms?.name}
						/>
						<StringTd
							name="field"
							bind:value={node.field}
							readonly
							errors={errors[row]?.iterms?.field}
						/>
						<StringTd
							name="type"
							bind:value={node.type}
							readonly
							errors={errors[row]?.iterms?.type}
						/>
						<PermissionTypeTd
							name="permissionType"
							bind:value={node.permissionType}
							readonly
							errors={errors[row]?.iterms?.permissionType}
						/>
						<StringTd
							name="description"
							bind:value={node.description}
							readonly
							errors={errors[row]?.iterms?.description}
						/>
						<ObjectTd name="roles" errors={errors[row]?.iterms?.roles} path="_/roles" on:gotoField />
						<ObjectTd name="realm" errors={errors[row]?.iterms?.realm} path="_/realm" on:gotoField />
						<th class="z-20 w-24">
							<div class="flex space-x-1">
								<div class="tooltip hover:z-30" data-tip={$LL.web.components.table.editBtn()}>
									<button
										class="btn btn-square btn-ghost btn-xs"
										on:click|preventDefault={(e) => {
											dispatch('edit', { row });
										}}
									>
										<Icon src={PencilSquare} solid />
									</button>
								</div>
								<div class="tooltip hover:z-30" data-tip={$LL.web.components.table.removeBtn()}>
									<button
										class="btn btn-square btn-ghost btn-xs"
										on:click|preventDefault={(e) => {
											messageBoxs.open({
												title: $LL.web.components.table.removeModalTitle(),
												buttonName: $LL.web.components.table.removeBtn(),
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
					</tr>
				{/if}
			{/each}
		{:else}
			<TableEmpty cols={7 + 2}/>
		{/if}
	</tbody>
</Table>
