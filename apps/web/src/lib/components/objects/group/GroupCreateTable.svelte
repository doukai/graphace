<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons/types';
	import { ObjectTd, StringTh, StringTd, IntTh, IntTd } from '@graphace/ui-graphql/components/table';
	import { Table, TableHead, TableEmpty } from '@graphace/ui/components/table';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type { GroupInput } from '~/lib/types/schema';

	export let nodes: (GroupInput | null | undefined)[] | null | undefined;
	export let errors: Record<number, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showSaveButton: boolean = true;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		edit: { row: number };
		create: {};
		mutation: { nodes: (GroupInput | null | undefined)[] | null | undefined };
		save: { nodes: (GroupInput | null | undefined)[] | null | undefined };
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
	title={$LL.graphql.objects.Group.name()}
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
		<tr class="z-20">
			<th class="w-12">
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
			<td>{$LL.graphql.objects.Group.fields.name.name()}</td>
			<td>{$LL.graphql.objects.Group.fields.path.name()}</td>
			<td>{$LL.graphql.objects.Group.fields.deep.name()}</td>
			<td>{$LL.graphql.objects.Group.fields.parent.name()}</td>
			<td>{$LL.graphql.objects.Group.fields.subGroups.name()}</td>
			<td>{$LL.graphql.objects.Group.fields.users.name()}</td>
			<td>{$LL.graphql.objects.Group.fields.roles.name()}</td>
			<td>{$LL.graphql.objects.Group.fields.realm.name()}</td>
			<th />
		</tr>
	</thead>
	<tbody>
		{#if nodes && nodes.length > 0}
			{#each nodes as node, row}
				{#if node}
					<tr class="hover">
						<th class="z-10 w-12">
							<label>
								<input type="checkbox" class="checkbox" bind:group={selectedRowList} value={row} />
							</label>
						</th>
						<StringTd
							name="name"
							bind:value={node.name}
							readonly
							errors={errors[row]?.iterms?.name}
						/>
						<StringTd
							name="path"
							bind:value={node.path}
							readonly
							errors={errors[row]?.iterms?.path}
						/>
						<IntTd
							name="deep"
							bind:value={node.deep}
							readonly
							errors={errors[row]?.iterms?.deep}
						/>
						<ObjectTd name="parent" errors={errors[row]?.iterms?.parent} path="_/parent" on:gotoField />
						<ObjectTd name="subGroups" errors={errors[row]?.iterms?.subGroups} path="_/sub-groups" on:gotoField />
						<ObjectTd name="users" errors={errors[row]?.iterms?.users} path="_/users" on:gotoField />
						<ObjectTd name="roles" errors={errors[row]?.iterms?.roles} path="_/roles" on:gotoField />
						<ObjectTd name="realm" errors={errors[row]?.iterms?.realm} path="_/realm" on:gotoField />
						<th class="z-10 hover:z-30 w-24">
							<div class="flex space-x-1">
								<div class="tooltip" data-tip={$LL.web.components.table.editBtn()}>
									<button
										class="btn btn-square btn-ghost btn-xs"
										on:click|preventDefault={(e) => {
											dispatch('edit', { row });
										}}
									>
										<Icon src={PencilSquare} solid />
									</button>
								</div>
								<div class="tooltip" data-tip={$LL.web.components.table.removeBtn()}>
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
			<TableEmpty cols={8 + 2}/>
		{/if}
	</tbody>
</Table>
