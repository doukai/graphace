<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors, PermissionsStore} from '@graphace/commons';
	import { type GraphQLError, buildArguments } from '@graphace/graphql';
	import { Table, TableHead, TableLoading, TableEmpty, Pagination, messageBoxs, notifications, z_index } from '@graphace/ui';
	import { ObjectTd, StringTh, StringTd } from '@graphace/ui-graphql';
	import UserTh from '~/lib/components/objects/user/UserTh.svelte';
	import GroupTh from '~/lib/components/objects/group/GroupTh.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import PermissionTh from '~/lib/components/objects/permission/PermissionTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import UserSelectTd from '~/lib/components/objects/user/UserSelectTd.svelte';
	import GroupSelectTd from '~/lib/components/objects/group/GroupSelectTd.svelte';
	import RoleSelectTd from '~/lib/components/objects/role/RoleSelectTd.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import { buildGraphQLErrors, buildGlobalGraphQLErrorMessage } from '~/utils';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type {
		RoleOrderBy,
		QueryRoleConnectionArgs,
		RoleInput
	} from '~/lib/types/schema';

	export let nodes: (RoleInput | null | undefined)[] | null | undefined = undefined;
	export let totalCount: number = 0;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let showSaveButton: boolean = true;
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	
	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');
	const z_class = z_index.top(1);
	const z_class2 = z_index.top(2);
	const z_class3 = z_index.top(3);

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryRoleConnectionArgs;
			then: (data: (RoleInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: RoleInput;
			then: (data: RoleInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: RoleInput[];
			then: (data: RoleInput[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (RoleInput | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	export let args: QueryRoleConnectionArgs = {};
	export let orderBy: RoleOrderBy = {};
	export let after: string | undefined = undefined;
	export let before: string | undefined = undefined;
	export let pageNumber: number = 1;
	export let pageSize: number = 10;

	let selectAll: boolean;
	export let selectedIdList: (string | null | undefined)[] = [];

	export const queryPage = (toPageNumber?: number | undefined) => {
		let _args: QueryRoleConnectionArgs = buildArguments(args);

		if (Object.keys(orderBy).length > 0) {
			_args.orderBy = orderBy;
		} else {
			_args.orderBy = undefined;
		}

		if (after) {
			_args.after = after;
			_args.first = pageSize;
		} else if (before) {
			_args.before = before;
			_args.last = pageSize;
		} else {
			_args.offset = ((toPageNumber || pageNumber) - 1) * pageSize;
			_args.first = pageSize;
		}

		dispatch('fetch', {
			args: _args,
			then: (data) => {
				errors = {};
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.graphence.message.requestFailed());
			}
		});
	};

	export const search = (searchValue: string | undefined) => {
		let _args: QueryRoleConnectionArgs = {};
		if (searchValue) {
			_args.cond = 'OR';
			_args.name = { opr: 'LK', val: `%${searchValue}%` };
			_args.description = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			_args.cond = undefined;
			_args.name = undefined;
			_args.description = undefined;
		}
		
		if (after) {
			_args.after = after;
			_args.first = pageSize;
		} else if (before) {
			_args.before = before;
			_args.last = pageSize;
		} else {
			_args.offset = (pageNumber - 1) * pageSize;
			_args.first = pageSize;
		}

		dispatch('fetch', {
			args: _args,
			then: (data) => {
				errors = {};
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.graphence.message.requestFailed());
			}
		});
	};

	const updateField = (args: RoleInput | null | undefined, row?: number) => {
		if (args) {
			dispatch('mutation', {
				args,
				then: (data) => {
					if (nodes && row) {
						nodes[row] = data;
					}
					notifications.success($LL.graphence.message.saveSuccess());
				},
				catch: (graphQLErrors) => {
					console.error(graphQLErrors);
					errors = buildGraphQLErrors(graphQLErrors);
					const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
					if (globalError) {
						messageBoxs.open({
							title: $LL.graphence.message.saveFailed(),
							content: globalError,
							buttonName: $LL.ui.button.back(),
							buttonType: 'neutral',
							confirm: () => {
								queryPage(1);
								return true;
							}
						});
					}
				}
			});
		}
	};

	const removeRow = (id: string) => {
		dispatch('mutation', {
			args: { where: { id: { val: id } }, isDeprecated: true },
			then: (data) => {
				notifications.success($LL.graphence.message.removeSuccess());
				queryPage(1);
			},
			catch: (graphQLErrors) => {
				console.error(graphQLErrors);
				errors = buildGraphQLErrors(graphQLErrors);
				const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
				if (globalError) {
					messageBoxs.open({
						title: $LL.graphence.message.removeFailed(),
						content: globalError,
						buttonName: $LL.ui.button.back(),
						buttonType: 'neutral',
						confirm: () => {
							queryPage(1);
							return true;
						}
					});
				}
			}
		});
	};

	const removeRows = () => {
		dispatch('mutation', {
			args: {
				where: { id: { opr: 'IN', arr: selectedIdList } },
				isDeprecated: true
			},
			then: (data) => {
				notifications.success($LL.graphence.message.removeSuccess());
				queryPage(1);
			},
			catch: (graphQLErrors) => {
				console.error(graphQLErrors);
				errors = buildGraphQLErrors(graphQLErrors);
				const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
				if (globalError) {
					messageBoxs.open({
						title: $LL.graphence.message.removeFailed(),
						content: globalError,
						buttonName: $LL.ui.button.back(),
						buttonType: 'neutral',
						confirm: () => {
							queryPage(1);
							return true;
						}
					});
				}
			}
		});
	};

	const unbindRows = (selectedIdList: (string | null | undefined)[]) => {
		dispatch('parentMutation', {
			args: selectedIdList
				.map((id) => {
					return { where: { id: { val: id } }, isDeprecated: true };
				}),
			then: (data) => {
				notifications.success($LL.graphence.message.unbindSuccess());
				queryPage(1);
			},
			catch: (graphQLErrors) => {
				console.error(graphQLErrors);
				errors = buildGraphQLErrors(graphQLErrors);
				const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
				if (globalError) {
					messageBoxs.open({
						title: $LL.graphence.message.unbindFailed(),
						content: globalError,
						buttonName: $LL.ui.button.back(),
						buttonType: 'neutral',
						confirm: () => {
							queryPage(1);
							return true;
						}
					});
				}
			}
		});
	};
</script>

<TableHead
	title={$LL.graphql.objects.Role.name()}
	showRemoveButton={permissions.auth('Role::*::WRITE') && showRemoveButton && selectedIdList.length > 0}
	showUnbindButton={permissions.auth('Role::*::WRITE') && showUnbindButton && selectedIdList.length > 0}
	showSaveButton={permissions.auth('Role::*::WRITE') && showSaveButton}
	showGotoSelectButton={permissions.auth('Role::*::WRITE') && showGotoSelectButton}
	{showBackButton}
	on:create
	on:search={(e) => search(e.detail.value)}
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
	on:unbind={(e) =>
		messageBoxs.open({
			title: $LL.graphence.components.table.unbindModalTitle(),
			buttonName: $LL.graphence.components.table.unbindBtn(),
			buttonType: 'error',
			confirm: () => {
				unbindRows(selectedIdList);
				return true;
			},
			button1: {
				name: $LL.graphence.components.table.removeBtn(),
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
<Table className="table-zebra table-pin-rows table-pin-cols md:table-sm">
	<thead>
		<tr class="{z_class2}">
			<th class="w-12">
				<label>
					<input
						type="checkbox"
						class="checkbox md:checkbox-sm"
						bind:checked={selectAll}
						on:change={(e) => {
							if (nodes && nodes.length > 0) {
								selectedIdList = selectAll ? nodes.map((node) => node?.id) : [];
							}
						}}
					/>
				</label>
			</th>
			{#if permissions.auth('Role::name::*')}
			<StringTh
				name={$LL.graphql.objects.Role.fields.name.name()}
				bind:value={args.name}
				bind:sort={orderBy.name}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('Role::description::*')}
			<StringTh
				name={$LL.graphql.objects.Role.fields.description.name()}
				bind:value={args.description}
				bind:sort={orderBy.description}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('Role::users::*')}
			<UserTh
				name={$LL.graphql.objects.Role.fields.users.name()}
				bind:value={args.users}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('Role::groups::*')}
			<GroupTh
				name={$LL.graphql.objects.Role.fields.groups.name()}
				bind:value={args.groups}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('Role::composites::*')}
			<RoleTh
				name={$LL.graphql.objects.Role.fields.composites.name()}
				bind:value={args.composites}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('Role::permissions::*')}
			<PermissionTh
				name={$LL.graphql.objects.Role.fields.permissions.name()}
				bind:value={args.permissions}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('Role::realm::*')}
			<RealmTh
				name={$LL.graphql.objects.Role.fields.realm.name()}
				bind:value={args.realm}
				on:filter={(e) => queryPage(1)}
			/>
			{/if}
			{#if permissions.auth('Role::*::WRITE')}
			<th />
			{/if}
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={pageSize} cols={7 + 2}/>
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node, row}
					{#if node}
						<tr class="hover">
							<th class="{z_class} w-12">
								<label>
									<input type="checkbox" class="checkbox md:checkbox-sm" bind:group={selectedIdList} value={ node.id } />
								</label>
							</th>
							{#if permissions.auth('Role::name::*')}
							<StringTd
								name="name"
								bind:value={node.name}
								on:save={(e) => updateField({ name: node?.name, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('Role::name::WRITE')}
								errors={errors?.[row]?.iterms?.name}
							/>
							{/if}
							{#if permissions.auth('Role::description::*')}
							<StringTd
								name="description"
								bind:value={node.description}
								on:save={(e) => updateField({ description: node?.description, where: { id: { val: node?.id } } }, row)}
								readonly={!permissions.auth('Role::description::WRITE')}
								errors={errors?.[row]?.iterms?.description}
							/>
							{/if}
							{#if permissions.auth('Role::users::*')}
							<UserSelectTd
								name="users"
								bind:value={node.users}
								list
								errors={errors?.[row]?.iterms?.users}
								readonly={!permissions.auth('Role::users::WRITE')}
								on:save={(e) =>
									updateField({ users: node?.users, where: { id: { val: node?.id } } }, row)}
							/>
							{/if}
							{#if permissions.auth('Role::groups::*')}
							<GroupSelectTd
								name="groups"
								bind:value={node.groups}
								list
								errors={errors?.[row]?.iterms?.groups}
								readonly={!permissions.auth('Role::groups::WRITE')}
								on:save={(e) =>
									updateField({ groups: node?.groups, where: { id: { val: node?.id } } }, row)}
							/>
							{/if}
							{#if permissions.auth('Role::composites::*')}
							<RoleSelectTd
								name="composites"
								bind:value={node.composites}
								list
								errors={errors?.[row]?.iterms?.composites}
								readonly={!permissions.auth('Role::composites::WRITE')}
								on:save={(e) =>
									updateField({ composites: node?.composites, where: { id: { val: node?.id } } }, row)}
							/>
							{/if}
							{#if permissions.auth('Role::permissions::*')}
							<ObjectTd name="permissions" errors={errors?.[row]?.iterms?.permissions} path={`${node.id}/permissions`} on:gotoField />
							{/if}
							{#if permissions.auth('Role::realm::*')}
							<ObjectTd name="realm" namedStruct={node.realm} errors={errors?.[row]?.iterms?.realm} path={`${node.id}/realm`} on:gotoField />
							{/if}
							{#if permissions.auth('Role::*::WRITE')}
							<th class="{z_class} hover:{z_class3} w-24">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.graphence.components.table.editBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => {
												if (node && node.id) {
													dispatch('edit', { id: node.id });
												}
											}}
										>
											<Icon src={PencilSquare} solid />
										</button>
									</div>
									{#if showUnbindButton}
										<div class="tooltip" data-tip={$LL.graphence.components.table.unbindBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click|preventDefault={(e) => {
													messageBoxs.open({
														title: $LL.graphence.components.table.unbindModalTitle(),
														buttonName: $LL.graphence.components.table.unbindBtn(),
														buttonType: 'error',
														confirm: () => {
															if (node?.id) {
																unbindRows([node.id]);
															}
															return true;
														},
														button1: {
															name: $LL.graphence.components.table.removeBtn(),
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
										<div class="tooltip" data-tip={$LL.graphence.components.table.removeBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click|preventDefault={(e) => {
													messageBoxs.open({
														title: $LL.graphence.components.table.removeModalTitle(),
														buttonName: $LL.graphence.components.table.removeBtn(),
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
				<TableEmpty cols={7 + 2}/>
			{/if}
		</tbody>
	{/if}
</Table>
<div class="divider" />
<Pagination
	bind:pageNumber
	bind:pageSize
	{totalCount}
	on:pageChange={(e) => queryPage()}
	on:sizeChange={(e) => queryPage()}
/>