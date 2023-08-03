<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons/types';
	import { ObjectTd, IDTh, IDTd, StringTh, StringTd, BooleanTh, BooleanTd, IntTh, IntTd, TimestampTh, TimestampTd } from '@graphace/ui-graphql/components/table';
	import { Card } from '@graphace/ui/components/card';
	import { Table, TableHead, TableEmpty } from '@graphace/ui/components/table';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type { MutationTypeUserArgs } from '~/lib/types/schema';

	export let nodes: (MutationTypeUserArgs | null | undefined)[] | null | undefined;
	export let errors: Record<number, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showSaveButton: boolean = true;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		edit: { row: number };
		create: {};
		mutation: { nodes: (MutationTypeUserArgs | null | undefined)[] | null | undefined };
		save: { nodes: (MutationTypeUserArgs | null | undefined)[] | null | undefined };
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

<Card>
	<TableHead
		title={$LL.graphql.objects.User.name()}
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
				<th class="z-10 w-12">
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
				<td>{$LL.graphql.objects.User.fields.id.name()}</td>
				<td>{$LL.graphql.objects.User.fields.name.name()}</td>
				<td>{$LL.graphql.objects.User.fields.lastName.name()}</td>
				<td>{$LL.graphql.objects.User.fields.login.name()}</td>
				<td>{$LL.graphql.objects.User.fields.email.name()}</td>
				<td>{$LL.graphql.objects.User.fields.disable.name()}</td>
				<td>{$LL.graphql.objects.User.fields.groups.name()}</td>
				<td>{$LL.graphql.objects.User.fields.roles.name()}</td>
				<td>{$LL.graphql.objects.User.fields.realm.name()}</td>
				<td>{$LL.graphql.objects.User.fields.isDeprecated.name()}</td>
				<td>{$LL.graphql.objects.User.fields.version.name()}</td>
				<td>{$LL.graphql.objects.User.fields.realmId.name()}</td>
				<td>{$LL.graphql.objects.User.fields.createUserId.name()}</td>
				<td>{$LL.graphql.objects.User.fields.createTime.name()}</td>
				<td>{$LL.graphql.objects.User.fields.updateUserId.name()}</td>
				<td>{$LL.graphql.objects.User.fields.updateTime.name()}</td>
				<td>{$LL.graphql.objects.User.fields.createGroupId.name()}</td>
				<td>{$LL.graphql.objects.User.fields.userGroup.name()}</td>
				<td>{$LL.graphql.objects.User.fields.userRole.name()}</td>
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
								name="lastName"
								bind:value={node.lastName}
								readonly
								errors={errors[row]?.iterms?.lastName}
							/>
							<StringTd
								name="login"
								bind:value={node.login}
								readonly
								errors={errors[row]?.iterms?.login}
							/>
							<StringTd
								name="email"
								bind:value={node.email}
								readonly
								errors={errors[row]?.iterms?.email}
							/>
							<BooleanTd
								name="disable"
								bind:value={node.disable}
								readonly
								errors={errors[row]?.iterms?.disable}
							/>
							<ObjectTd name="groups" errors={errors[row]?.iterms?.groups} path="_/groups" on:gotoField />
							<ObjectTd name="roles" errors={errors[row]?.iterms?.roles} path="_/roles" on:gotoField />
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
							<ObjectTd name="userGroup" errors={errors[row]?.iterms?.userGroup} path="_/user-group" on:gotoField />
							<ObjectTd name="userRole" errors={errors[row]?.iterms?.userRole} path="_/user-role" on:gotoField />
							<th class="z-10 w-24">
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
				<TableEmpty cols={19 + 2}/>
			{/if}
		</tbody>
	</Table>
</Card>
