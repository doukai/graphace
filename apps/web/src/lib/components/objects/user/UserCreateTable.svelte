<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { Table, TableHead, TableEmpty, messageBoxs } from '@graphace/ui';
	import { ObjectTd, StringTh, StringTd, BooleanTh, BooleanTd } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type { UserInput } from '~/lib/types/schema';
	import { auth } from '@graphace/commons';

	export let nodes: (UserInput | null | undefined)[] | null | undefined;
	export let errors: Record<number, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showSaveButton: boolean = true;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

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
	title={$LL.graphql.objects.User.name()}
	showRemoveButton={auth('User::*::WRITE') && showRemoveButton && selectedRowList.length > 0}
	showSaveButton={auth('User::*::WRITE') && showSaveButton}
	showGotoSelectButton={auth('User::*::WRITE') && showGotoSelectButton}
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
			{#if auth('User::name::*')}
			<td>{$LL.graphql.objects.User.fields.name.name()}</td>
			{/if}
			{#if auth('User::lastName::*')}
			<td>{$LL.graphql.objects.User.fields.lastName.name()}</td>
			{/if}
			{#if auth('User::login::*')}
			<td>{$LL.graphql.objects.User.fields.login.name()}</td>
			{/if}
			{#if auth('User::email::*')}
			<td>{$LL.graphql.objects.User.fields.email.name()}</td>
			{/if}
			{#if auth('User::phones::*')}
			<td>{$LL.graphql.objects.User.fields.phones.name()}</td>
			{/if}
			{#if auth('User::disable::*')}
			<td>{$LL.graphql.objects.User.fields.disable.name()}</td>
			{/if}
			{#if auth('User::groups::*')}
			<td>{$LL.graphql.objects.User.fields.groups.name()}</td>
			{/if}
			{#if auth('User::roles::*')}
			<td>{$LL.graphql.objects.User.fields.roles.name()}</td>
			{/if}
			{#if auth('User::realm::*')}
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
								<input type="checkbox" class="checkbox" bind:group={selectedRowList} value={row} />
							</label>
						</th>
						{#if auth('User::name::*')}
						<StringTd
							name="name"
							bind:value={node.name}
							readonly
							errors={errors[row]?.iterms?.name}
						/>
						{/if}
						{#if auth('User::lastName::*')}
						<StringTd
							name="lastName"
							bind:value={node.lastName}
							readonly
							errors={errors[row]?.iterms?.lastName}
						/>
						{/if}
						{#if auth('User::login::*')}
						<StringTd
							name="login"
							bind:value={node.login}
							readonly
							errors={errors[row]?.iterms?.login}
						/>
						{/if}
						{#if auth('User::email::*')}
						<StringTd
							name="email"
							bind:value={node.email}
							readonly
							errors={errors[row]?.iterms?.email}
						/>
						{/if}
						{#if auth('User::phones::*')}
						<StringTd
							name="phones"
							bind:value={node.phones}
							list
							readonly
							errors={errors[row]?.iterms?.phones}
						/>
						{/if}
						{#if auth('User::disable::*')}
						<BooleanTd
							name="disable"
							bind:value={node.disable}
							readonly
							errors={errors[row]?.iterms?.disable}
						/>
						{/if}
						{#if auth('User::groups::*')}
						<ObjectTd name="groups" errors={errors[row]?.iterms?.groups} path="_/groups" on:gotoField />
						{/if}
						{#if auth('User::roles::*')}
						<ObjectTd name="roles" errors={errors[row]?.iterms?.roles} path="_/roles" on:gotoField />
						{/if}
						{#if auth('User::realm::*')}
						<ObjectTd name="realm" errors={errors[row]?.iterms?.realm} path="_/realm" on:gotoField />
						{/if}
						{#if auth('User::*::WRITE')}
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
			<TableEmpty cols={9 + 2}/>
		{/if}
	</tbody>
</Table>
