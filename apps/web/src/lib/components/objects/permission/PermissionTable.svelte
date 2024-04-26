<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import type { GraphQLError } from '@graphace/graphql';
	import { Table, TableHead, TableLoading, TableEmpty, messageBoxs, notifications } from '@graphace/ui';
	import { ObjectTd, IDTh, IDTd, StringTh, StringTd } from '@graphace/ui-graphql';
	import PermissionTypeTh from '~/lib/components/enums/permission-type/PermissionTypeTh.svelte';
	import PermissionTypeTd from '~/lib/components/enums/permission-type/PermissionTypeTd.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import RoleSelectTd from '~/lib/components/objects/role/RoleSelectTd.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		PermissionOrderBy,
		QueryPermissionListArgs,
		PermissionInput
	} from '~/lib/types/schema';
	import { permissions } from '~/lib/utils/auth-util';

	export let nodes: (PermissionInput | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let showSaveButton: boolean = true;
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryPermissionListArgs;
			then: (data: (PermissionInput | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: PermissionInput;
			then: (data: PermissionInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: PermissionInput[];
			then: (data: PermissionInput[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (PermissionInput | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	export let args: QueryPermissionListArgs = {};
	export let orderBy: PermissionOrderBy = {};

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
		let args: QueryPermissionListArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.description = { opr: 'LK', val: `%${searchValue}%` };
			args.field = { opr: 'LK', val: `%${searchValue}%` };
			args.type = { opr: 'LK', val: `%${searchValue}%` };
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

	const updateField = (args: PermissionInput | null | undefined, row?: number) => {
		if (args) {
			dispatch('mutation', {
				args,
				then: (data) => {
					query();
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
			args: { where: { name: { val: id } }, isDeprecated: true },
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
				where: { name: { opr: 'IN', arr: selectedIdList} },
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
					return {where: { name: { val: id } }, isDeprecated: true};
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
	title={$LL.graphql.objects.Permission.name()}
	showRemoveButton={permissions.auth('Permission::*::WRITE') && showRemoveButton && selectedIdList.length > 0}
	showUnbindButton={permissions.auth('Permission::*::WRITE') && showUnbindButton && selectedIdList.length > 0}
	showSaveButton={permissions.auth('Permission::*::WRITE') && showSaveButton}
	showGotoSelectButton={permissions.auth('Permission::*::WRITE') && showGotoSelectButton}
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
								selectedIdList = selectAll ? nodes.map((node) => node?.name) : [];
							}
						}}
					/>
				</label>
			</th>
			{#if permissions.auth('Permission::name::*')}
			<IDTh
				name={$LL.graphql.objects.Permission.fields.name.name()}
				bind:expression={args.name}
				bind:sort={orderBy.name}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Permission::description::*')}
			<StringTh
				name={$LL.graphql.objects.Permission.fields.description.name()}
				bind:expression={args.description}
				bind:sort={orderBy.description}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Permission::field::*')}
			<StringTh
				name={$LL.graphql.objects.Permission.fields.field.name()}
				bind:expression={args.field}
				bind:sort={orderBy.field}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Permission::type::*')}
			<StringTh
				name={$LL.graphql.objects.Permission.fields.type.name()}
				bind:expression={args.type}
				bind:sort={orderBy.type}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Permission::permissionType::*')}
			<PermissionTypeTh
				name={$LL.graphql.objects.Permission.fields.permissionType.name()}
				bind:expression={args.permissionType}
				bind:sort={orderBy.permissionType}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Permission::roles::*')}
			<RoleTh
				name={$LL.graphql.objects.Permission.fields.roles.name()}
				bind:expression={args.roles}
				on:filter={(e) => query()}
			/>
			{/if}
			{#if permissions.auth('Permission::realm::*')}
			<RealmTh
				name={$LL.graphql.objects.Permission.fields.realm.name()}
				bind:expression={args.realm}
				on:filter={(e) => query()}
			/>
			{/if}
			<th />
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={10} cols={7 + 2}/>
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node, row}
					{#if node && node.name}
						<tr class="hover">
							<th class="z-10 w-12">
								<label>
									<input type="checkbox" class="checkbox" bind:group={selectedIdList} value={node.name} />
								</label>
							</th>
							{#if permissions.auth('Permission::name::*')}
							<IDTd
								name="name"
								bind:value={node.name}
								readonly
								errors={errors[row]?.iterms?.name}
							/>
							{/if}
							{#if permissions.auth('Permission::description::*')}
							<StringTd
								name="description"
								bind:value={node.description}
								on:save={(e) => updateField({ description: node?.description, where: { name: { val: node?.name } } }, row)}
								readonly={!permissions.auth('Permission::description::WRITE')}
								errors={errors[row]?.iterms?.description}
							/>
							{/if}
							{#if permissions.auth('Permission::field::*')}
							<StringTd
								name="field"
								bind:value={node.field}
								on:save={(e) => updateField({ field: node?.field, where: { name: { val: node?.name } } }, row)}
								readonly={!permissions.auth('Permission::field::WRITE')}
								errors={errors[row]?.iterms?.field}
							/>
							{/if}
							{#if permissions.auth('Permission::type::*')}
							<StringTd
								name="type"
								bind:value={node.type}
								on:save={(e) => updateField({ type: node?.type, where: { name: { val: node?.name } } }, row)}
								readonly={!permissions.auth('Permission::type::WRITE')}
								errors={errors[row]?.iterms?.type}
							/>
							{/if}
							{#if permissions.auth('Permission::permissionType::*')}
							<PermissionTypeTd
								name="permissionType"
								bind:value={node.permissionType}
								on:save={(e) => updateField({ permissionType: node?.permissionType, where: { name: { val: node?.name } } }, row)}
								readonly={!permissions.auth('Permission::permissionType::WRITE')}
								errors={errors[row]?.iterms?.permissionType}
							/>
							{/if}
							{#if permissions.auth('Permission::roles::*')}
							<RoleSelectTd
								name="roles"
								bind:value={node.roles}
								list
								errors={errors[row]?.iterms?.roles}
								readonly={!permissions.auth('Permission::roles::WRITE')}
								on:save={(e) =>
									updateField({ roles: node?.roles, where: { name: {val: node?.name } } }, row)}
							/>
							{/if}
							{#if permissions.auth('Permission::realm::*')}
							<ObjectTd name="realm" namedStruct={node.realm} errors={errors[row]?.iterms?.realm} path={`${node.name}/realm`} on:gotoField />
							{/if}
							{#if permissions.auth('Permission::*::WRITE')}
							<th class="z-10 hover:z-30 w-24">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.web.components.table.editBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click|preventDefault={(e) => {
												if (node && node.name) {
													dispatch('edit', {id: node.name});
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
															if (node?.name) {
																unbindRows([node.name]);
															}
															return true;
														},
														button1: {
															name: $LL.web.components.table.removeBtn(),
															className: 'btn-error',
															onClick: () => {
																if (node?.name) {
																	removeRow(node.name);
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
															if (node?.name) {
																removeRow(node.name);
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
