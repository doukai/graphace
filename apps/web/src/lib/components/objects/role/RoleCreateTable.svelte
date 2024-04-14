<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { Table, TableHead, TableEmpty, messageBoxs } from '@graphace/ui';
	import { ObjectTd, StringTh, StringTd } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type { RoleInput } from '~/lib/types/schema';
	import { permissions } from '~/lib/utils/auth-util';

	export let nodes: (RoleInput | null | undefined)[] | null | undefined;
	export let errors: Record<number, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showSaveButton: boolean = true;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		edit: { row: number };
		create: {};
		mutation: { nodes: (RoleInput | null | undefined)[] | null | undefined };
		save: { nodes: (RoleInput | null | undefined)[] | null | undefined };
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
	title={$LL.graphql.objects.Role.name()}
	showRemoveButton={permissions.auth('Role::*::WRITE') && showRemoveButton && selectedRowList.length > 0}
	showSaveButton={permissions.auth('Role::*::WRITE') && showSaveButton}
	showGotoSelectButton={permissions.auth('Role::*::WRITE') && showGotoSelectButton}
	{showBackButton}
	showSearchInput={false}
	on:create
	on:save={(e) => dispatch('save', { nodes })}
	on:remove={(e) => {
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
						on:change={(e) => {
							if (nodes && nodes.length > 0) {
								selectedRowList = selectAll ? nodes.map((node) => nodes?.indexOf(node)) : [];
							}
						}}
					/>
				</label>
			</th>
			{#if permissions.auth('Role::name::*')}
			<td>{$LL.graphql.objects.Role.fields.name.name()}</td>
			{/if}
			{#if permissions.auth('Role::description::*')}
			<td>{$LL.graphql.objects.Role.fields.description.name()}</td>
			{/if}
			{#if permissions.auth('Role::users::*')}
			<td>{$LL.graphql.objects.Role.fields.users.name()}</td>
			{/if}
			{#if permissions.auth('Role::groups::*')}
			<td>{$LL.graphql.objects.Role.fields.groups.name()}</td>
			{/if}
			{#if permissions.auth('Role::composites::*')}
			<td>{$LL.graphql.objects.Role.fields.composites.name()}</td>
			{/if}
			{#if permissions.auth('Role::permissions::*')}
			<td>{$LL.graphql.objects.Role.fields.permissions.name()}</td>
			{/if}
			{#if permissions.auth('Role::realm::*')}
			<td>{$LL.graphql.objects.Role.fields.realm.name()}</td>
			{/if}
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
						{#if permissions.auth('Role::name::*')}
						<StringTd
							name="name"
							bind:value={node.name}
							readonly
							errors={errors[row]?.iterms?.name}
						/>
						{/if}
						{#if permissions.auth('Role::description::*')}
						<StringTd
							name="description"
							bind:value={node.description}
							readonly
							errors={errors[row]?.iterms?.description}
						/>
						{/if}
						{#if permissions.auth('Role::users::*')}
						<ObjectTd name="users" namedStruct={node.users} errors={errors[row]?.iterms?.users} path="_/users" on:gotoField />
						{/if}
						{#if permissions.auth('Role::groups::*')}
						<ObjectTd name="groups" namedStruct={node.groups} errors={errors[row]?.iterms?.groups} path="_/groups" on:gotoField />
						{/if}
						{#if permissions.auth('Role::composites::*')}
						<ObjectTd name="composites" namedStruct={node.composites} errors={errors[row]?.iterms?.composites} path="_/composites" on:gotoField />
						{/if}
						{#if permissions.auth('Role::permissions::*')}
						<ObjectTd name="permissions"  errors={errors[row]?.iterms?.permissions} path="_/permissions" on:gotoField />
						{/if}
						{#if permissions.auth('Role::realm::*')}
						<ObjectTd name="realm" namedStruct={node.realm} errors={errors[row]?.iterms?.realm} path="_/realm" on:gotoField />
						{/if}
						{#if permissions.auth('Role::*::WRITE')}
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
						{/if}
					</tr>
				{/if}
			{/each}
		{:else}
			<TableEmpty cols={7 + 2}/>
		{/if}
	</tbody>
</Table>
