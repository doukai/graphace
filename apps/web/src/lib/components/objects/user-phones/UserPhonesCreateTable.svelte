<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ObjectTd, StringTh, StringTd, TimestampTh, TimestampTd, IDTh, IDTd, BooleanTh, BooleanTd, IntTh, IntTd } from '@graphace/ui-graphql/components/table';
	import { SectionHead } from '@graphace/ui/components/section';
	import { Table } from '@graphace/ui/components/table';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus, PencilAlt, Trash, ChevronLeft } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	import type { MutationTypeUserPhonesArgs } from '~/lib/types/schema';

	export let nodes: (MutationTypeUserPhonesArgs | null | undefined)[] | null | undefined;

	const dispatch = createEventDispatcher<{
		edit: { row: number };
		create: {};
		save: { nodes: (MutationTypeUserPhonesArgs | null | undefined)[] | null | undefined };
		back: {};
	}>();

	let showDeleteButton = false;

	let selectAll: boolean;
	let selectedRows: Record<number, boolean> = {};

	$: selectedRowList = Object.keys(selectedRows)
		.map(Number)
		.filter((row) => selectedRows[row])
		.map((row) => row);

	$: if (selectedRowList.length > 0) {
		showDeleteButton = true;
	} else {
		showDeleteButton = false;
	}

	const removeRow = (row: number) => {
		nodes?.splice(row, 1);
	};

	const removeRows = () => {
		selectedRowList.forEach((row) => removeRow(row));
	};
</script>

<SectionHead title="UserPhones">
	{#if showDeleteButton}
		<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.remove()}>
			<button
				class="btn btn-error btn-outline btn-square"
				on:click={(e) => {
					e.preventDefault();
					messageBoxs.open({
						title: $LL.components.graphql.table.removeModalTitle(),
						buttonName: $LL.components.graphql.table.removeBtn(),
						buttonType: 'error',
						confirm: () => {
							removeRows();
							return true;
						}
					});
				}}
			>
				<Icon src={Trash} class="h-6 w-6" solid />
			</button>
		</div>
	{/if}
	<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.create()}>
		<button
			class="btn btn-square md:hidden"
			on:click={(e) => {
				e.preventDefault();
				dispatch('create');
			}}
		>
			<Icon src={Plus} class="h-6 w-6" solid />
		</button>
	</div>
	<button
		class="hidden md:btn"
		on:click={(e) => {
			e.preventDefault();
			dispatch('create');
		}}
	>
		{$LL.routers.type.create()}
	</button>
	<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.back()}>
		<button
			class="btn btn-square md:hidden"
			on:click={(e) => {
				e.preventDefault();
				dispatch('back');
			}}
		>
			<Icon src={ChevronLeft} class="h-6 w-6" solid />
		</button>
	</div>
	<button
		class="hidden md:btn"
		on:click={(e) => {
			e.preventDefault();
			dispatch('back');
		}}
	>
		{$LL.routers.type.back()}
	</button>
	<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.save()}>
		<button
			class="btn btn-square md:hidden"
			on:click={(e) => {
				e.preventDefault();
				dispatch('save', { nodes });
			}}
		>
			<Icon src={ChevronLeft} class="h-6 w-6" solid />
		</button>
	</div>
	<button
		class="hidden md:btn"
		on:click={(e) => {
			e.preventDefault();
			dispatch('save', { nodes });
		}}
	>
		{$LL.routers.type.save()}
	</button>
</SectionHead>
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
			<th>createGroupId</th>
			<th>createTime</th>
			<th>createUserId</th>
			<th>id</th>
			<th>isDeprecated</th>
			<th>phone</th>
			<th>realmId</th>
			<th>updateTime</th>
			<th>updateUserId</th>
			<th>userId</th>
			<th>version</th>
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
						<StringTd
							name="createGroupId"
							bind:value={node.createGroupId}
							readonly
							error={errors[node.id]?.createGroupId}
						/>
						<TimestampTd
							name="createTime"
							bind:value={node.createTime}
							readonly
							error={errors[node.id]?.createTime}
						/>
						<StringTd
							name="createUserId"
							bind:value={node.createUserId}
							readonly
							error={errors[node.id]?.createUserId}
						/>
						<IDTd
							name="id"
							bind:value={node.id}
							readonly
							error={errors[node.id]?.id}
						/>
						<BooleanTd
							name="isDeprecated"
							bind:value={node.isDeprecated}
							readonly
							error={errors[node.id]?.isDeprecated}
						/>
						<StringTd
							name="phone"
							bind:value={node.phone}
							readonly
							error={errors[node.id]?.phone}
						/>
						<StringTd
							name="realmId"
							bind:value={node.realmId}
							readonly
							error={errors[node.id]?.realmId}
						/>
						<TimestampTd
							name="updateTime"
							bind:value={node.updateTime}
							readonly
							error={errors[node.id]?.updateTime}
						/>
						<StringTd
							name="updateUserId"
							bind:value={node.updateUserId}
							readonly
							error={errors[node.id]?.updateUserId}
						/>
						<IntTd
							name="userId"
							bind:value={node.userId}
							readonly
							error={errors[node.id]?.userId}
						/>
						<IntTd
							name="version"
							bind:value={node.version}
							readonly
							error={errors[node.id]?.version}
						/>
						<td>
							<div class="tooltip" data-tip={$LL.components.graphql.table.editBtn()}>
								<button
									class="btn btn-square btn-ghost btn-xs"
									on:click={(e) => {
										e.preventDefault();
										dispatch('edit', { row });
									}}
								>
									<Icon src={PencilAlt} solid />
								</button>
							</div>
							<div class="tooltip" data-tip={$LL.components.graphql.table.removeBtn()}>
								<button
									class="btn btn-square btn-ghost btn-xs"
									on:click={(e) => {
										e.preventDefault();
										messageBoxs.open({
											title: $LL.components.graphql.table.removeModalTitle(),
											buttonName: $LL.components.graphql.table.removeBtn(),
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
						</td>
					</tr>
				{/if}
			{/each}
		{/if}
	</tbody>
</Table>
