<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { ObjectTd, IDTh, IDTd, StringTh, StringTd } from '@graphace/ui-graphql/components/table';
	import PermissionTypeTh from '~/lib/components/enums/permission-type/PermissionTypeTh.svelte';
	import PermissionTypeTd from '~/lib/components/enums/permission-type/PermissionTypeTd.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import { Card } from '@graphace/ui/components/card';
	import { Table, TableHead, TableLoading, TableEmpty } from '@graphace/ui/components/table';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		Permission,
		PermissionOrderBy,
		QueryPermissionListArgs,
		PermissionInput
	} from '~/lib/types/schema';

	export let nodes: (Permission | null | undefined)[] | null | undefined;
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
			then: (data: (Permission | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: PermissionInput;
			then: (data: Permission | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: PermissionInput[];
			then: (data: Permission[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (Permission | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	let args: QueryPermissionListArgs = {};
	let orderBy: PermissionOrderBy = {};

	let selectAll: boolean;
	let selectedIdList: (string | null)[] = [];

	const query = () => {
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

	const search = (searchValue: string | undefined) => {
		let args: QueryPermissionListArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.field = { opr: 'LK', val: `%${searchValue}%` };
			args.type = { opr: 'LK', val: `%${searchValue}%` };
			args.description = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.field = undefined;
			args.type = undefined;
			args.description = undefined;
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

	const updateField = (args: PermissionInput | null | undefined) => {
		if (args) {
			dispatch('mutation', {
				args,
				then: (data) => {
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
			args: { id: id, isDeprecated: true },
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
				where: { id: { opr: 'IN', in: selectedIdList } },
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

	const unbindRows = (selectedIdList: (string | null)[]) => {
		dispatch('parentMutation', {
			args: selectedIdList
				.map((id) => nodes?.find((node) => node?.name === id))
				.map((node) => {
					return { ...node, isDeprecated: true };
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

<Card>
	<TableHead
		title={$LL.graphql.objects.Permission.name()}
		showRemoveButton={showRemoveButton && selectedIdList.length > 0}
		showUnbindButton={showUnbindButton && selectedIdList.length > 0}
		{showSaveButton}
		{showGotoSelectButton}
		{showBackButton}
		on:create
		on:search={(e) => search(e.detail.value)}
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
		on:unbind={() =>
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
							on:change={() => {
								if (nodes && nodes.length > 0) {
									selectedIdList = selectAll ? nodes.map((node) => node?.id || null) : [];
								}
							}}
						/>
					</label>
				</th>
				<IDTh
					name={$LL.graphql.objects.Permission.fields.name.name()}
					bind:expression={args.name}
					bind:sort={orderBy.name}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.Permission.fields.field.name()}
					bind:expression={args.field}
					bind:sort={orderBy.field}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.Permission.fields.type.name()}
					bind:expression={args.type}
					bind:sort={orderBy.type}
					on:filter={query}
				/>
				<PermissionTypeTh
					name={$LL.graphql.objects.Permission.fields.permissionType.name()}
					bind:expression={args.permissionType}
					bind:sort={orderBy.permissionType}
					on:filter={query}
				/>
				<StringTh
					name={$LL.graphql.objects.Permission.fields.description.name()}
					bind:expression={args.description}
					bind:sort={orderBy.description}
					on:filter={query}
				/>
				<RoleTh
					name={$LL.graphql.objects.Permission.fields.roles.name()}
					bind:expression={args.roles}
					on:filter={query}
				/>
				<RealmTh
					name={$LL.graphql.objects.Permission.fields.realm.name()}
					bind:expression={args.realm}
					on:filter={query}
				/>
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
										<input type="checkbox" class="checkbox" bind:group={selectedIdList} value={node.id} />
									</label>
								</th>
								<IDTd
									name="name"
									bind:value={node.name}
									readonly
									errors={errors[row]?.iterms?.name}
								/>
								<StringTd
									name="field"
									bind:value={node.field}
									on:save={() => updateField({ field: node?.field, where: { name: { val: node?.name } } })}
									errors={errors[row]?.iterms?.field}
								/>
								<StringTd
									name="type"
									bind:value={node.type}
									on:save={() => updateField({ type: node?.type, where: { name: { val: node?.name } } })}
									errors={errors[row]?.iterms?.type}
								/>
								<PermissionTypeTd
									name="permissionType"
									bind:value={node.permissionType}
									on:save={() => updateField({ permissionType: node?.permissionType, where: { name: { val: node?.name } } })}
									errors={errors[row]?.iterms?.permissionType}
								/>
								<StringTd
									name="description"
									bind:value={node.description}
									on:save={() => updateField({ description: node?.description, where: { name: { val: node?.name } } })}
									errors={errors[row]?.iterms?.description}
								/>
								<ObjectTd name="roles" errors={errors[row]?.iterms?.roles} path={`${node.name}/roles`} on:gotoField />
								<ObjectTd name="realm" errors={errors[row]?.iterms?.realm} path={`${node.name}/realm`} on:gotoField />
								<th class="z-10 w-24">
									<div class="flex space-x-1">
										<div class="tooltip" data-tip={$LL.web.components.table.editBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click={(e) => {
													e.preventDefault();
													if (node && node.name) {
														dispatch('edit', { id: node.name });
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
													on:click={(e) => {
														e.preventDefault();
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
													on:click={(e) => {
														e.preventDefault();
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
							</tr>
						{/if}
					{/each}
				{:else}
					<TableEmpty cols={7 + 2}/>
				{/if}
			</tbody>
		{/if}
	</Table>
</Card>
