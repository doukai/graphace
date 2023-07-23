<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons/types';
	import { ObjectTd, IDTh, IDTd, StringTh, StringTd, BooleanTh, BooleanTd, IntTh, IntTd, TimestampTh, TimestampTd } from '@graphace/ui-graphql/components/table';
	import { Card } from '@graphace/ui/components/card';
	import { Table, TableHead, TableLoading, TableEmpty } from '@graphace/ui/components/table';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type { MutationTypeRoleArgs } from '~/lib/types/schema';

	export let nodes: (MutationTypeRoleArgs | null | undefined)[] | null | undefined;
	export let errors: Record<number, Errors> = {};
	export let showSaveButton: boolean = true;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		edit: { row: number };
		create: {};
		save: { nodes: (MutationTypeRoleArgs | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	let showRemoveButton = false;

	let selectAll: boolean;
	let selectedRows: Record<number, boolean> = {};

	$: selectedRowList = Object.keys(selectedRows)
		.map(Number)
		.filter((row) => selectedRows[row])
		.map((row) => row);

	$: if (selectedRowList.length > 0) {
		showRemoveButton = true;
	} else {
		showRemoveButton = false;
	}

	const removeRow = (row: number) => {
		nodes?.splice(row, 1);
	};

	const removeRows = () => {
		selectedRowList.forEach((row) => removeRow(row));
	};
</script>

<Card>
	<TableHead
		title="Role"
		{showRemoveButton}
		{showSaveButton}
		{showBackButton}
		{showGotoSelectButton}
		showSearchInput={false}
		on:create
		on:save={() => dispatch('save', { nodes })}
		on:removeRows={() => {
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
				<th class="z-10">
					<label>
						<input
							type="checkbox"
							class="checkbox"
							bind:checked={selectAll}
							on:change={() => {
								if (nodes && nodes.length > 0) {
									nodes.forEach((_, row) => {
										selectedRows[row] = selectAll;
									});
								}
							}}
						/>
					</label>
				</th>
				<td>id</td>
				<td>name</td>
				<td>description</td>
				<td>users</td>
				<td>permissions</td>
				<td>realm</td>
				<td>isDeprecated</td>
				<td>version</td>
				<td>realmId</td>
				<td>createUserId</td>
				<td>createTime</td>
				<td>updateUserId</td>
				<td>updateTime</td>
				<td>createGroupId</td>
				<td>userRole</td>
				<td>roleComposite</td>
				<th />
			</tr>
		</thead>
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node, row}
					{#if node}
						<tr class="hover">
							<th class="z-10">
								<label>
									<input type="checkbox" class="checkbox" bind:checked={selectedRows[row]} />
								</label>
							</th>
							<IDTd
								name="id"
								bind:value={node.id}
								readonly
								errors={errors[row]?.iterms?.id}
							/>
							<StringTd
								name="name"
								bind:value={node.name}
								readonly
								errors={errors[row]?.iterms?.name}
							/>
							<StringTd
								name="description"
								bind:value={node.description}
								readonly
								errors={errors[row]?.iterms?.description}
							/>
							<ObjectTd name="users" errors={errors[row]?.iterms?.users} path="_/users" on:gotoField />
							<ObjectTd name="permissions" errors={errors[row]?.iterms?.permissions} path="_/permissions" on:gotoField />
							<ObjectTd name="realm" errors={errors[row]?.iterms?.realm} path="_/realm" on:gotoField />
							<BooleanTd
								name="isDeprecated"
								bind:value={node.isDeprecated}
								readonly
								errors={errors[row]?.iterms?.isDeprecated}
							/>
							<IntTd
								name="version"
								bind:value={node.version}
								readonly
								errors={errors[row]?.iterms?.version}
							/>
							<StringTd
								name="realmId"
								bind:value={node.realmId}
								readonly
								errors={errors[row]?.iterms?.realmId}
							/>
							<StringTd
								name="createUserId"
								bind:value={node.createUserId}
								readonly
								errors={errors[row]?.iterms?.createUserId}
							/>
							<TimestampTd
								name="createTime"
								bind:value={node.createTime}
								readonly
								errors={errors[row]?.iterms?.createTime}
							/>
							<StringTd
								name="updateUserId"
								bind:value={node.updateUserId}
								readonly
								errors={errors[row]?.iterms?.updateUserId}
							/>
							<TimestampTd
								name="updateTime"
								bind:value={node.updateTime}
								readonly
								errors={errors[row]?.iterms?.updateTime}
							/>
							<StringTd
								name="createGroupId"
								bind:value={node.createGroupId}
								readonly
								errors={errors[row]?.iterms?.createGroupId}
							/>
							<ObjectTd name="userRole" errors={errors[row]?.iterms?.userRole} path="_/user-role" on:gotoField />
							<ObjectTd name="roleComposite" errors={errors[row]?.iterms?.roleComposite} path="_/role-composite" on:gotoField />
							<th class="z-10">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.web.components.table.editBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click={(e) => {
												e.preventDefault();
												dispatch('edit', { row });
											}}
										>
											<Icon src={PencilSquare} solid />
										</button>
									</div>
									<div class="tooltip" data-tip={$LL.web.components.table.removeBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click={(e) => {
												e.preventDefault();
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
				<TableEmpty cols={16 + 2}/>
			{/if}
		</tbody>
	</Table>
</Card>
