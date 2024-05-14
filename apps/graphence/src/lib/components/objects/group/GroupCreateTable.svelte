<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import { Table, TableHead, TableEmpty, messageBoxs } from '@graphace/ui';
	import { ObjectTd, StringTh, StringTd, IntTh, IntTd } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash } from '@steeze-ui/heroicons';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { GroupInput } from '~/lib/types/schema';

	export let nodes: (GroupInput | null | undefined)[] | null | undefined;
	export let errors: Record<number, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showSaveButton: boolean = true;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;

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
	showRemoveButton={permissions.auth('Group::*::WRITE') && showRemoveButton && selectedRowList.length > 0}
	showSaveButton={permissions.auth('Group::*::WRITE') && showSaveButton}
	showGotoSelectButton={permissions.auth('Group::*::WRITE') && showGotoSelectButton}
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
			{#if permissions.auth('Group::name::*')}
			<td>{$LL.graphql.objects.Group.fields.name.name()}</td>
			{/if}
			{#if permissions.auth('Group::description::*')}
			<td>{$LL.graphql.objects.Group.fields.description.name()}</td>
			{/if}
			{#if permissions.auth('Group::path::*')}
			<td>{$LL.graphql.objects.Group.fields.path.name()}</td>
			{/if}
			{#if permissions.auth('Group::deep::*')}
			<td>{$LL.graphql.objects.Group.fields.deep.name()}</td>
			{/if}
			{#if permissions.auth('Group::parentId::*')}
			<td>{$LL.graphql.objects.Group.fields.parentId.name()}</td>
			{/if}
			{#if permissions.auth('Group::parent::*')}
			<td>{$LL.graphql.objects.Group.fields.parent.name()}</td>
			{/if}
			{#if permissions.auth('Group::subGroups::*')}
			<td>{$LL.graphql.objects.Group.fields.subGroups.name()}</td>
			{/if}
			{#if permissions.auth('Group::users::*')}
			<td>{$LL.graphql.objects.Group.fields.users.name()}</td>
			{/if}
			{#if permissions.auth('Group::roles::*')}
			<td>{$LL.graphql.objects.Group.fields.roles.name()}</td>
			{/if}
			{#if permissions.auth('Group::realm::*')}
			<td>{$LL.graphql.objects.Group.fields.realm.name()}</td>
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
						{#if permissions.auth('Group::name::*')}
						<StringTd
							name="name"
							bind:value={node.name}
							readonly
							errors={errors[row]?.iterms?.name}
						/>
						{/if}
						{#if permissions.auth('Group::description::*')}
						<StringTd
							name="description"
							bind:value={node.description}
							readonly
							errors={errors[row]?.iterms?.description}
						/>
						{/if}
						{#if permissions.auth('Group::path::*')}
						<StringTd
							name="path"
							bind:value={node.path}
							readonly
							errors={errors[row]?.iterms?.path}
						/>
						{/if}
						{#if permissions.auth('Group::deep::*')}
						<IntTd
							name="deep"
							bind:value={node.deep}
							readonly
							errors={errors[row]?.iterms?.deep}
						/>
						{/if}
						{#if permissions.auth('Group::parentId::*')}
						<StringTd
							name="parentId"
							bind:value={node.parentId}
							readonly
							errors={errors[row]?.iterms?.parentId}
						/>
						{/if}
						{#if permissions.auth('Group::parent::*')}
						<ObjectTd name="parent" namedStruct={node.parent} errors={errors[row]?.iterms?.parent} path="_/parent" on:gotoField />
						{/if}
						{#if permissions.auth('Group::subGroups::*')}
						<ObjectTd name="subGroups" namedStruct={node.subGroups} errors={errors[row]?.iterms?.subGroups} path="_/sub-groups" on:gotoField />
						{/if}
						{#if permissions.auth('Group::users::*')}
						<ObjectTd name="users" namedStruct={node.users} errors={errors[row]?.iterms?.users} path="_/users" on:gotoField />
						{/if}
						{#if permissions.auth('Group::roles::*')}
						<ObjectTd name="roles" namedStruct={node.roles} errors={errors[row]?.iterms?.roles} path="_/roles" on:gotoField />
						{/if}
						{#if permissions.auth('Group::realm::*')}
						<ObjectTd name="realm" namedStruct={node.realm} errors={errors[row]?.iterms?.realm} path="_/realm" on:gotoField />
						{/if}
						{#if permissions.auth('Group::*::WRITE')}
						<th class="z-10 hover:z-30 w-24">
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
			<TableEmpty cols={10 + 2}/>
		{/if}
	</tbody>
</Table>
