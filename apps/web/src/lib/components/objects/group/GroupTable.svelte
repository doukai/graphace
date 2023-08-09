<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { ObjectTd, StringTh, StringTd } from '@graphace/ui-graphql/components/table';
	import GroupTh from '~/lib/components/objects/group/GroupTh.svelte';
	import UserTh from '~/lib/components/objects/user/UserTh.svelte';
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
		Group,
		GroupOrderBy,
		QueryTypeGroupListArgs,
		MutationTypeGroupArgs
	} from '~/lib/types/schema';

	export let nodes: (Group | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let showSaveButton: boolean = true;
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryTypeGroupListArgs;
			then: (data: (Group | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: MutationTypeGroupArgs;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: MutationTypeGroupArgs[];
			update?: boolean;
			then: (data: Group[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (Group | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	let args: QueryTypeGroupListArgs = {};
	let orderBy: GroupOrderBy = {};

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
		let args: QueryTypeGroupListArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.name = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.name = undefined;
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

	const updateField = (args: MutationTypeGroupArgs | null | undefined) => {
		if (args) {
			dispatch('mutation', {
				args,
				update: true,
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
			update: true,
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
			update: true,
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
				.map((id) => nodes?.find((node) => node?.id === id))
				.map((node) => {
					return { ...node, isDeprecated: true };
				}),
			update: true,
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
		title={$LL.graphql.objects.Group.name()}
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
			<tr>
				<th class="z-10 w-12">
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
				<StringTh
					name={$LL.graphql.objects.Group.fields.name.name()}
					bind:expression={args.name}
					bind:sort={orderBy.name}
					on:filter={query}
				/>
				<GroupTh
					name={$LL.graphql.objects.Group.fields.parent.name()}
					bind:expression={args.parent}
					on:filter={query}
				/>
				<GroupTh
					name={$LL.graphql.objects.Group.fields.subGroups.name()}
					bind:expression={args.subGroups}
					on:filter={query}
				/>
				<UserTh
					name={$LL.graphql.objects.Group.fields.users.name()}
					bind:expression={args.users}
					on:filter={query}
				/>
				<RoleTh
					name={$LL.graphql.objects.Group.fields.roles.name()}
					bind:expression={args.roles}
					on:filter={query}
				/>
				<RealmTh
					name={$LL.graphql.objects.Group.fields.realm.name()}
					bind:expression={args.realm}
					on:filter={query}
				/>
				<th />
			</tr>
		</thead>
		{#if isFetching}
			<TableLoading rows={10} cols={6 + 2}/>
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
								<StringTd
									name="name"
									bind:value={node.name}
									on:save={() => updateField({ id: node?.id, name: node?.name })}
									errors={errors[row]?.iterms?.name}
								/>
								<ObjectTd name="parent" errors={errors[row]?.iterms?.parent} path={`${node.id}/parent`} on:gotoField />
								<ObjectTd name="subGroups" errors={errors[row]?.iterms?.subGroups} path={`${node.id}/sub-groups`} on:gotoField />
								<ObjectTd name="users" errors={errors[row]?.iterms?.users} path={`${node.id}/users`} on:gotoField />
								<ObjectTd name="roles" errors={errors[row]?.iterms?.roles} path={`${node.id}/roles`} on:gotoField />
								<ObjectTd name="realm" errors={errors[row]?.iterms?.realm} path={`${node.id}/realm`} on:gotoField />
								<th class="z-10 w-24">
									<div class="flex space-x-1">
										<div class="tooltip" data-tip={$LL.web.components.table.editBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click={(e) => {
													e.preventDefault();
													if (node && node.id) {
														dispatch('edit', { id: node.id });
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
													on:click={(e) => {
														e.preventDefault();
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
							</tr>
						{/if}
					{/each}
				{:else}
					<TableEmpty cols={6 + 2}/>
				{/if}
			</tbody>
		{/if}
	</Table>
</Card>
