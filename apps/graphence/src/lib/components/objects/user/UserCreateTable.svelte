<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import { Table, TableHead, TableEmpty, messageBoxs } from '@graphace/ui';
	import { ObjectTd, StringTh, StringTd, BooleanTh, BooleanTd } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash } from '@steeze-ui/heroicons';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { UserInput } from '~/lib/types/schema';

	export let nodes: (UserInput | null | undefined)[] | null | undefined;
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
		mutation: { nodes: (UserInput | null | undefined)[] | null | undefined };
		save: { nodes: (UserInput | null | undefined)[] | null | undefined };
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
	title={$LL.graphql.objects.User.name()}
	showRemoveButton={permissions.auth('User::*::WRITE') && showRemoveButton && selectedRowList.length > 0}
	showSaveButton={permissions.auth('User::*::WRITE') && showSaveButton}
	showGotoSelectButton={permissions.auth('User::*::WRITE') && showGotoSelectButton}
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
		<tr class="z-20">
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
			{#if permissions.auth('User::name::*')}
			<td>{$LL.graphql.objects.User.fields.name.name()}</td>
			{/if}
			{#if permissions.auth('User::description::*')}
			<td>{$LL.graphql.objects.User.fields.description.name()}</td>
			{/if}
			{#if permissions.auth('User::lastName::*')}
			<td>{$LL.graphql.objects.User.fields.lastName.name()}</td>
			{/if}
			{#if permissions.auth('User::login::*')}
			<td>{$LL.graphql.objects.User.fields.login.name()}</td>
			{/if}
			{#if permissions.auth('User::email::*')}
			<td>{$LL.graphql.objects.User.fields.email.name()}</td>
			{/if}
			{#if permissions.auth('User::phones::*')}
			<td>{$LL.graphql.objects.User.fields.phones.name()}</td>
			{/if}
			{#if permissions.auth('User::disable::*')}
			<td>{$LL.graphql.objects.User.fields.disable.name()}</td>
			{/if}
			{#if permissions.auth('User::groups::*')}
			<td>{$LL.graphql.objects.User.fields.groups.name()}</td>
			{/if}
			{#if permissions.auth('User::roles::*')}
			<td>{$LL.graphql.objects.User.fields.roles.name()}</td>
			{/if}
			{#if permissions.auth('User::realm::*')}
			<td>{$LL.graphql.objects.User.fields.realm.name()}</td>
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
								<input type="checkbox" class="checkbox md:checkbox-sm" bind:group={selectedRowList} value={row} />
							</label>
						</th>
						{#if permissions.auth('User::name::*')}
						<StringTd
							name="name"
							bind:value={node.name}
							readonly={!permissions.auth('User::name::WRITE')}
							errors={errors[row]?.iterms?.name}
						/>
						{/if}
						{#if permissions.auth('User::description::*')}
						<StringTd
							name="description"
							bind:value={node.description}
							readonly={!permissions.auth('User::description::WRITE')}
							errors={errors[row]?.iterms?.description}
						/>
						{/if}
						{#if permissions.auth('User::lastName::*')}
						<StringTd
							name="lastName"
							bind:value={node.lastName}
							readonly={!permissions.auth('User::lastName::WRITE')}
							errors={errors[row]?.iterms?.lastName}
						/>
						{/if}
						{#if permissions.auth('User::login::*')}
						<StringTd
							name="login"
							bind:value={node.login}
							readonly={!permissions.auth('User::login::WRITE')}
							errors={errors[row]?.iterms?.login}
						/>
						{/if}
						{#if permissions.auth('User::email::*')}
						<StringTd
							name="email"
							bind:value={node.email}
							readonly={!permissions.auth('User::email::WRITE')}
							errors={errors[row]?.iterms?.email}
						/>
						{/if}
						{#if permissions.auth('User::phones::*')}
						<StringTd
							name="phones"
							bind:value={node.phones}
							list
							readonly={!permissions.auth('User::phones::WRITE')}
							errors={errors[row]?.iterms?.phones}
						/>
						{/if}
						{#if permissions.auth('User::disable::*')}
						<BooleanTd
							name="disable"
							bind:value={node.disable}
							readonly={!permissions.auth('User::disable::WRITE')}
							errors={errors[row]?.iterms?.disable}
						/>
						{/if}
						{#if permissions.auth('User::groups::*')}
						<ObjectTd name="groups" namedStruct={node.groups} errors={errors[row]?.iterms?.groups} path="_/groups" on:gotoField />
						{/if}
						{#if permissions.auth('User::roles::*')}
						<ObjectTd name="roles" namedStruct={node.roles} errors={errors[row]?.iterms?.roles} path="_/roles" on:gotoField />
						{/if}
						{#if permissions.auth('User::realm::*')}
						<ObjectTd name="realm" namedStruct={node.realm} errors={errors[row]?.iterms?.realm} path="_/realm" on:gotoField />
						{/if}
						{#if permissions.auth('User::*::WRITE')}
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
