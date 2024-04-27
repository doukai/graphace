<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Table, TableHead, TableLoading, TableEmpty, messageBoxs, notifications } from '@graphace/ui';
	import { ObjectTd, StringTh, StringTd, IntTh, IntTd } from '@graphace/ui-graphql';
	import GroupTh from '~/lib/components/objects/group/GroupTh.svelte';
	import UserTh from '~/lib/components/objects/user/UserTh.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import GroupSelectTd from '~/lib/components/objects/group/GroupSelectTd.svelte';
	import UserSelectTd from '~/lib/components/objects/user/UserSelectTd.svelte';
	import RoleSelectTd from '~/lib/components/objects/role/RoleSelectTd.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		GroupOrderBy,
		QueryGroupListArgs,
		GroupInput
	} from '~/lib/types/schema';
	import { permissions } from '~/lib/utils/auth-util';

	export let nodes: (GroupInput | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let showSaveButton: boolean = true;
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryGroupListArgs;
			then: (data: (GroupInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: GroupInput;
			then: (data: GroupInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: GroupInput[];
			then: (data: GroupInput[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (GroupInput | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	export let args: QueryGroupListArgs = {};
	export let orderBy: GroupOrderBy = {};

	let selectAll: boolean;
	export let selectedIdList: (string | null | undefined)[] = [];

	export const query = () => {
		if (Object.keys(orderBy).length > 0) {
			args.orderBy = orderBy;
		} else {
			args.orderBy = undefined;
		}

		dispatch('fetch', {
			args,
			then: (data) => {
				errors = {};
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.requestFailed());
			}
		});
	};

	export const search = (searchValue: string | undefined) => {
		let args: QueryGroupListArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.name = { opr: 'LK', val: `%${searchValue}%` };
			args.description = { opr: 'LK', val: `%${searchValue}%` };
			args.path = { opr: 'LK', val: `%${searchValue}%` };
			args.parentId = { opr: 'LK', val: `%${searchValue}%` };
		}

		dispatch('fetch', {
			args,
			then: (data) => {
				errors = {};
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.requestFailed());
			}
		});
	};

	const updateField = (args: GroupInput | null | undefined, row?: number) => {
		if (args) {
			dispatch('mutation', {
				args,
				then: (data) => {
					if (nodes && row) {
						nodes[row] = data;
					}
					notifications.success($LL.web.message.saveSuccess());
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.saveFailed());
				}
			});
		}
	}

	const removeRow = (id: string) => {
		dispatch('mutation', {
			args: { where: { id: { val: id } }, isDeprecated: true },
			then: (data) => {
				notifications.success($LL.web.message.removeSuccess());
				query();
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.removeFailed());
			}
		});
	}

	const removeRows = () => {
		dispatch('mutation', {
			args: {
				where: { id: { opr: 'IN', arr: selectedIdList} },
				isDeprecated: true
			},
			then: (data) => {
				notifications.success($LL.web.message.removeSuccess());
				query();
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.removeFailed());
			}
		});
	};

	const unbindRows = (selectedIdList: (string | null | undefined)[]) => {
		dispatch('parentMutation', {
			args: selectedIdList
				.map((id) => {
					return {where: { id: { val: id } }, isDeprecated: true};
				}),
			then: (data) => {
				notifications.success($LL.web.message.unbindSuccess());
				query();
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.web.message.unbindFailed());
			}
		});
	};
</script>

<TableHead
	title={$LL.graphql.objects.Group.name()}
	showRemoveButton={permissions.auth('Group::*::WRITE') && showRemoveButton && selectedIdList.length > 0}
	showUnbindButton={permissions.auth('Group::*::WRITE') && showUnbindButton && selectedIdList.length > 0}
	showSaveButton={permissions.auth('Group::*::WRITE') && showSaveButton}
	showGotoSelectButton={permissions.auth('Group::*::WRITE') && showGotoSelectButton}
	{showBackButton}
	on:create
	on:search={(e) => search(e.detail.value)}
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
	on:unbind={(e) =>
		messageBoxs.open({
			title: $LL.web.components.table.unbindModalTitle(),
			buttonName: $LL.web.components.table.unbindBtn(),
			buttonType: 'error',
			confirm: () => {
				unbindRows(selectedIdList);
				return true;
			},
			button1: {
				name: $LL.web.components.table.removeBtn(),
				className: 'btn-error',
				onClick: () => {
					removeRows();
					return true;
				}
			}
		})}
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
								selectedIdList = selectAll ? nodes.map((node) => node?.id) : [];
							}
						}}
					/>
				</label>
			</th>
			{#if permissions.auth('Group::name::*')}
			<StringTh
				name={$LL.graphql.objects.Group.fields.name.name()}
				bind:expression={args.name}
				bind:sort={orderBy.name}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Group::description::*')}
			<StringTh
				name={$LL.graphql.objects.Group.fields.description.name()}
				bind:expression={args.description}
				bind:sort={orderBy.description}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Group::path::*')}
			<StringTh
				name={$LL.graphql.objects.Group.fields.path.name()}
				bind:expression={args.path}
				bind:sort={orderBy.path}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Group::deep::*')}
			<IntTh
				name={$LL.graphql.objects.Group.fields.deep.name()}
				bind:expression={args.deep}
				bind:sort={orderBy.deep}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Group::parentId::*')}
			<StringTh
				name={$LL.graphql.objects.Group.fields.parentId.name()}
				bind:expression={args.parentId}
				bind:sort={orderBy.parentId}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Group::parent::*')}
			<GroupTh
				name={$LL.graphql.objects.Group.fields.parent.name()}
				bind:expression={args.parent}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Group::subGroups::*')}
			<GroupTh
				name={$LL.graphql.objects.Group.fields.subGroups.name()}
				bind:expression={args.subGroups}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Group::users::*')}
			<UserTh
				name={$LL.graphql.objects.Group.fields.users.name()}
				bind:expression={args.users}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Group::roles::*')}
			<RoleTh
				name={$LL.graphql.objects.Group.fields.roles.name()}
				bind:expression={args.roles}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Group::realm::*')}
			<RealmTh
				name={$LL.graphql.objects.Group.fields.realm.name()}
				bind:expression={args.realm}
				on:filter={(e) => query()}
			/>
			{/if}
			<th />
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={10} cols={10 + 2}/>
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node, row}
					{#if node && node.id}
						<tr class="hover">
							<th class="z-10 w-12">
								<label>
									<input type="checkbox" class="checkbox" bind:group={selectedIdList} value={node.id} />
								</label>
							</th>
							{#if permissions.auth('Group::name::*')}
							<StringTd
								name="name"
								bind:value={node.name}
								on:save={(e) => updateField({ name: node?.name, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('Group::name::WRITE')}
								errors={errors[row]?.iterms?.name}
							/>
							{/if}
							{#if permissions.auth('Group::description::*')}
							<StringTd
								name="description"
								bind:value={node.description}
								on:save={(e) => updateField({ description: node?.description, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('Group::description::WRITE')}
								errors={errors[row]?.iterms?.description}
							/>
							{/if}
							{#if permissions.auth('Group::path::*')}
							<StringTd
								name="path"
								bind:value={node.path}
								on:save={(e) => updateField({ path: node?.path, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('Group::path::WRITE')}
								errors={errors[row]?.iterms?.path}
							/>
							{/if}
							{#if permissions.auth('Group::deep::*')}
							<IntTd
								name="deep"
								bind:value={node.deep}
								on:save={(e) => updateField({ deep: node?.deep, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('Group::deep::WRITE')}
								errors={errors[row]?.iterms?.deep}
							/>
							{/if}
							{#if permissions.auth('Group::parentId::*')}
							<StringTd
								name="parentId"
								bind:value={node.parentId}
								on:save={(e) => updateField({ parentId: node?.parentId, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('Group::parentId::WRITE')}
								errors={errors[row]?.iterms?.parentId}
							/>
							{/if}
							{#if permissions.auth('Group::parent::*')}
							<GroupSelectTd
								name="parent"
								bind:value={node.parent}
								errors={errors[row]?.iterms?.parent}
								readonly={!permissions.auth('Group::parent::WRITE')}
								on:save={(e) =>
									updateField({ parent: node?.parent, where: { id: {val: node?.id } } }, row)}
							/>
							{/if}
							{#if permissions.auth('Group::subGroups::*')}
							<GroupSelectTd
								name="subGroups"
								bind:value={node.subGroups}
								list
								errors={errors[row]?.iterms?.subGroups}
								readonly={!permissions.auth('Group::subGroups::WRITE')}
								on:save={(e) =>
									updateField({ subGroups: node?.subGroups, where: { id: {val: node?.id } } }, row)}
							/>
							{/if}
							{#if permissions.auth('Group::users::*')}
							<UserSelectTd
								name="users"
								bind:value={node.users}
								list
								errors={errors[row]?.iterms?.users}
								readonly={!permissions.auth('Group::users::WRITE')}
								on:save={(e) =>
									updateField({ users: node?.users, where: { id: {val: node?.id } } }, row)}
							/>
							{/if}
							{#if permissions.auth('Group::roles::*')}
							<RoleSelectTd
								name="roles"
								bind:value={node.roles}
								list
								errors={errors[row]?.iterms?.roles}
								readonly={!permissions.auth('Group::roles::WRITE')}
								on:save={(e) =>
									updateField({ roles: node?.roles, where: { id: {val: node?.id } } }, row)}
							/>
							{/if}
							{#if permissions.auth('Group::realm::*')}
							<ObjectTd name="realm" namedStruct={node.realm} errors={errors[row]?.iterms?.realm} path={`${node.id}/realm`} on:gotoField />
							{/if}
							{#if permissions.auth('Group::*::WRITE')}
							<th class="z-10 hover:z-30 w-24">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.web.components.table.editBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => {
												if (node && node.id) {
													dispatch('edit', {id: node.id});
												}
											}}
										>
											<Icon src={PencilSquare} solid />
										</button>
									</div>
									{#if showUnbindButton}
										<div class="tooltip" data-tip={$LL.web.components.table.unbindBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click|preventDefault={(e) => {
													messageBoxs.open({
														title: $LL.web.components.table.unbindModalTitle(),
														buttonName: $LL.web.components.table.unbindBtn(),
														buttonType: 'error',
														confirm: () => {
															if (node?.id) {
																unbindRows([node.id]);
															}
															return true;
														},
														button1: {
															name: $LL.web.components.table.removeBtn(),
															className: 'btn-error',
															onClick: () => {
																if (node?.id) {
																	removeRow(node.id);
																}
																return true;
															}
														}
													});
												}}
											>
												<Icon src={ArchiveBoxXMark} solid />
											</button>
										</div>
									{:else}
										<div class="tooltip" data-tip={$LL.web.components.table.removeBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click|preventDefault={(e) => {
													messageBoxs.open({
														title: $LL.web.components.table.removeModalTitle(),
														buttonName: $LL.web.components.table.removeBtn(),
														buttonType: 'error',
														confirm: () => {
															if (node?.id) {
																removeRow(node.id);
															}
															return true;
														}
													});
												}}
											>
												<Icon src={Trash} solid />
											</button>
										</div>
									{/if}
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
	{/if}
</Table>
