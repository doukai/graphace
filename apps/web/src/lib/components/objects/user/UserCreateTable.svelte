<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons/types';
	import { ObjectTd, IntTh, IntTd, StringTh, StringTd, TimestampTh, TimestampTd, BooleanTh, BooleanTd, IDTh, IDTd } from '@graphace/ui-graphql/components/table';
	import SexTh from '~/lib/components/enums/sex/SexTh.svelte';
	import SexTd from '~/lib/components/enums/sex/SexTd.svelte';
	import { SectionHead } from '@graphace/ui/components/section';
	import { Table } from '@graphace/ui/components/table';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus, PencilAlt, Trash, ChevronLeft } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	import type { MutationTypeUserArgs } from '~/lib/types/schema';

	export let nodes: (MutationTypeUserArgs | null | undefined)[] | null | undefined;
	export let errors: Record<number, Errors> = {};

	const dispatch = createEventDispatcher<{
		edit: { row: number };
		create: {};
		save: { nodes: (MutationTypeUserArgs | null | undefined)[] | null | undefined };
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

<SectionHead title="User">
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
			<th>age</th>
			<th>createGroupId</th>
			<th>createTime</th>
			<th>createUserId</th>
			<th>disable</th>
			<th>id</th>
			<th>isDeprecated</th>
			<th>login</th>
			<th>name</th>
			<th>organization</th>
			<th>organizationId</th>
			<th>password</th>
			<th>phones</th>
			<th>realmId</th>
			<th>roles</th>
			<th>sex</th>
			<th>test1</th>
			<th>test2</th>
			<th>updateTime</th>
			<th>updateUserId</th>
			<th>userProfile</th>
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
						<IntTd
							name="age"
							bind:value={node.age}
							readonly
							errors={errors[row]?.iterms?.age}
						/>
						<StringTd
							name="createGroupId"
							bind:value={node.createGroupId}
							readonly
							errors={errors[row]?.iterms?.createGroupId}
						/>
						<TimestampTd
							name="createTime"
							bind:value={node.createTime}
							readonly
							errors={errors[row]?.iterms?.createTime}
						/>
						<StringTd
							name="createUserId"
							bind:value={node.createUserId}
							readonly
							errors={errors[row]?.iterms?.createUserId}
						/>
						<BooleanTd
							name="disable"
							bind:value={node.disable}
							readonly
							errors={errors[row]?.iterms?.disable}
						/>
						<IDTd
							name="id"
							bind:value={node.id}
							readonly
							errors={errors[row]?.iterms?.id}
						/>
						<BooleanTd
							name="isDeprecated"
							bind:value={node.isDeprecated}
							readonly
							errors={errors[row]?.iterms?.isDeprecated}
						/>
						<StringTd
							name="login"
							bind:value={node.login}
							readonly
							errors={errors[row]?.iterms?.login}
						/>
						<StringTd
							name="name"
							bind:value={node.name}
							readonly
							errors={errors[row]?.iterms?.name}
						/>
						<ObjectTd name="organization" errors={errors[row]?.iterms?.organization} path="_/organization" on:gotoField />
						<IntTd
							name="organizationId"
							bind:value={node.organizationId}
							readonly
							errors={errors[row]?.iterms?.organizationId}
						/>
						<StringTd
							name="password"
							bind:value={node.password}
							readonly
							errors={errors[row]?.iterms?.password}
						/>
						<StringTd
							name="phones"
							bind:value={node.phones}
							list
							readonly
							errors={errors[row]?.iterms?.phones}
						/>
						<StringTd
							name="realmId"
							bind:value={node.realmId}
							readonly
							errors={errors[row]?.iterms?.realmId}
						/>
						<ObjectTd name="roles" errors={errors[row]?.iterms?.roles} path="_/roles" on:gotoField />
						<SexTd
							name="sex"
							bind:value={node.sex}
							readonly
							errors={errors[row]?.iterms?.sex}
						/>
						<IntTd
							name="test1"
							bind:value={node.test1}
							list
							readonly
							errors={errors[row]?.iterms?.test1}
						/>
						<BooleanTd
							name="test2"
							bind:value={node.test2}
							list
							readonly
							errors={errors[row]?.iterms?.test2}
						/>
						<TimestampTd
							name="updateTime"
							bind:value={node.updateTime}
							readonly
							errors={errors[row]?.iterms?.updateTime}
						/>
						<StringTd
							name="updateUserId"
							bind:value={node.updateUserId}
							readonly
							errors={errors[row]?.iterms?.updateUserId}
						/>
						<ObjectTd name="userProfile" errors={errors[row]?.iterms?.userProfile} path="_/user-profile" on:gotoField />
						<IntTd
							name="version"
							bind:value={node.version}
							readonly
							errors={errors[row]?.iterms?.version}
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
