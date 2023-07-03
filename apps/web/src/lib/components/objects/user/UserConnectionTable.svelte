<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons/types';
	import {
		ObjectTd,
		StringTh,
		StringTd,
		TimestampTh,
		TimestampTd,
		BooleanTh,
		BooleanTd,
		IDTh,
		IDTd,
		IntTh,
		IntTd
	} from '@graphace/ui-graphql/components/table';
	import { SectionHead } from '@graphace/ui/components/section';
	import { Card } from '@graphace/ui/components/card';
	import { Table, TableLoading } from '@graphace/ui/components/table';
	import SearchInput from '@graphace/ui/components/search/SearchInput.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus, PencilSquare, Trash, ArrowUturnLeft, InboxArrowDown } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	import { Pagination } from '@graphace/ui/components/connection';
	import {
		Conditional,
		Operator,
		User,
		UserOrderBy,
		QueryTypeUserConnectionArgs,
		MutationTypeUserArgs
	} from '~/lib/types/schema';

	export let nodes: (User | null | undefined)[] | null | undefined;
	export let totalCount: number = 0;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryTypeUserConnectionArgs;
			then: (data: (User | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		mutation: {
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (User | null | undefined)[] | null | undefined };
		back: {};
	}>();

	let showDeleteButton = false;
	let searchValue: string | undefined;
	let args: QueryTypeUserConnectionArgs = {};
	let orderBy: UserOrderBy = {};
	let after: string | undefined;
	let before: string | undefined;
	let pageNumber: number = 1;
	let pageSize: number = 10;
	$: offset = (pageNumber - 1) * pageSize;

	let selectAll: boolean;
	let selectedRows: Record<string, boolean> = {};

	$: selectedIdList = Object.keys(selectedRows)
		.filter((id) => selectedRows[id])
		.map((id) => id);

	$: if (selectedIdList.length > 0) {
		showDeleteButton = true;
	} else {
		showDeleteButton = false;
	}

	const query = () => {
		if (Object.keys(orderBy).length > 0) {
			args.orderBy = orderBy;
		} else {
			args.orderBy = undefined;
		}

		if (after) {
			args.after = after;
			args.first = pageSize;
		} else if (before) {
			args.before = before;
			args.last = pageSize;
		} else if (offset) {
			args.offset = offset;
			args.first = pageSize;
		} else {
			args.first = pageSize;
		}

		dispatch('fetch', {
			args,
			then: (data) => {},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.message.requestFailed());
			}
		});
	};

	const search = () => {
		let args: QueryTypeUserConnectionArgs = {};
		if (searchValue) {
			args.cond = Conditional.OR;
			args.createGroupId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.createUserId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.email = { opr: Operator.LK, val: `%${searchValue}%` };
			args.lastName = { opr: Operator.LK, val: `%${searchValue}%` };
			args.login = { opr: Operator.LK, val: `%${searchValue}%` };
			args.name = { opr: Operator.LK, val: `%${searchValue}%` };
			args.password = { opr: Operator.LK, val: `%${searchValue}%` };
			args.realmId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.updateUserId = { opr: Operator.LK, val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.createGroupId = undefined;
			args.createUserId = undefined;
			args.email = undefined;
			args.lastName = undefined;
			args.login = undefined;
			args.name = undefined;
			args.password = undefined;
			args.realmId = undefined;
			args.updateUserId = undefined;
		}

		if (after) {
			args.after = after;
			args.first = pageSize;
		} else if (before) {
			args.before = before;
			args.last = pageSize;
		} else if (offset) {
			args.offset = offset;
			args.first = pageSize;
		} else {
			args.first = pageSize;
		}

		dispatch('fetch', {
			args,
			then: (data) => {},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.message.requestFailed());
			}
		});
	};

	const updateField = (args: MutationTypeUserArgs | null | undefined) => {
		if (args) {
			dispatch('mutation', {
				args,
				then: (data) => {
					notifications.success($LL.message.saveSuccess());
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.message.saveFailed());
				}
			});
		}
	};

	const removeRow = (id: string) => {
		dispatch('mutation', {
			args: { id: id, isDeprecated: true },
			update: true,
			then: (data) => {
				notifications.success($LL.message.removeSuccess());
				query();
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.message.removeFailed());
			}
		});
	};

	const removeRows = () => {
		dispatch('mutation', {
			args: {
				where: { id: { opr: Operator.IN, in: selectedIdList } },
				isDeprecated: true
			},
			update: true,
			then: (data) => {
				notifications.success($LL.message.removeSuccess());
				query();
			},
			catch: (errors) => {
				console.error(errors);
				notifications.error($LL.message.removeFailed());
			}
		});
	};
</script>

<Card>
	<div class="flex">
		<div class="hidden md:flex w-full">
			<a class="btn btn-ghost normal-case text-xl" href={null} on:click>{'User'}</a>
		</div>
		<div class="w-full md:w-min">
			<SearchInput bind:value={searchValue} on:search={search} />
		</div>
		{#if showDeleteButton}
			<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.remove()}>
				<button
					class="btn btn-error btn-outline btn-square md:hidden ml-1"
					on:click={(e) => {
						e.preventDefault();
						messageBoxs.open({
							title: $LL.components.graphql.table.removeModalTitle(),
							buttonName: $LL.components.graphql.table.removeBtn(),
							buttonType: 'error',
							confirm: () => {
								removeRows();
								return true;
							}
						});
					}}
				>
					<Icon src={Trash} class="h-6 w-6" solid />
				</button>
			</div>
			<button
				class="hidden md:flex btn btn-outline btn-error ml-1"
				on:click={(e) => {
					e.preventDefault();
					messageBoxs.open({
						title: $LL.components.graphql.table.removeModalTitle(),
						buttonName: $LL.components.graphql.table.removeBtn(),
						buttonType: 'error',
						confirm: () => {
							removeRows();
							return true;
						}
					});
				}}
			>
				{$LL.routers.type.remove()}
			</button>
		{/if}
		<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.create()}>
			<button
				class="btn btn-primary btn-square md:hidden ml-1"
				on:click={(e) => {
					e.preventDefault();
					dispatch('create');
				}}
			>
				<Icon src={Plus} class="h-6 w-6" solid />
			</button>
		</div>
		<button
			class="hidden md:flex btn btn-primary ml-1"
			on:click={(e) => {
				e.preventDefault();
				dispatch('create');
			}}
		>
			{$LL.routers.type.create()}
		</button>
		<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.save()}>
			<button
				class="btn btn-secondary btn-square md:hidden ml-1"
				on:click={(e) => {
					e.preventDefault();
					dispatch('save', { nodes });
				}}
			>
				<Icon src={InboxArrowDown} class="h-6 w-6" solid />
			</button>
		</div>
		<button
			class="hidden md:flex btn btn-secondary ml-1"
			on:click={(e) => {
				e.preventDefault();
				dispatch('save', { nodes });
			}}
		>
			{$LL.routers.type.save()}
		</button>
		<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.back()}>
			<button
				class="btn btn-neutral btn-square md:hidden ml-1"
				on:click={(e) => {
					e.preventDefault();
					dispatch('back');
				}}
			>
				<Icon src={ArrowUturnLeft} class="h-6 w-6" solid />
			</button>
		</div>
		<button
			class="hidden md:flex btn btn-neutral ml-1"
			on:click={(e) => {
				e.preventDefault();
				dispatch('back');
			}}
		>
			{$LL.routers.type.back()}
		</button>
	</div>
	<div class="divider" />
	<Table>
		<thead>
			<tr>
				<th class="z-10">
					<label>
						<input
							type="checkbox"
							class="checkbox"
							bind:checked={selectAll}
							on:change={() => {
								if (nodes && nodes.length > 0) {
									nodes.forEach((node) => {
										if (node?.id) {
											selectedRows[node.id] = selectAll;
										}
									});
								}
							}}
						/>
					</label>
				</th>
				<StringTh
					name="createGroupId"
					bind:expression={args.createGroupId}
					bind:sort={orderBy.createGroupId}
					on:filter={query}
				/>
				<TimestampTh
					name="createTime"
					bind:expression={args.createTime}
					bind:sort={orderBy.createTime}
					on:filter={query}
				/>
				<StringTh
					name="createUserId"
					bind:expression={args.createUserId}
					bind:sort={orderBy.createUserId}
					on:filter={query}
				/>
				<BooleanTh
					name="disable"
					bind:expression={args.disable}
					bind:sort={orderBy.disable}
					on:filter={query}
				/>
				<StringTh
					name="email"
					bind:expression={args.email}
					bind:sort={orderBy.email}
					on:filter={query}
				/>
				<th>groups</th>
				<th>groupsConnection</th>
				<IDTh name="id" bind:expression={args.id} bind:sort={orderBy.id} on:filter={query} />
				<th>isDeprecated</th>
				<StringTh
					name="lastName"
					bind:expression={args.lastName}
					bind:sort={orderBy.lastName}
					on:filter={query}
				/>
				<StringTh
					name="login"
					bind:expression={args.login}
					bind:sort={orderBy.login}
					on:filter={query}
				/>
				<StringTh
					name="name"
					bind:expression={args.name}
					bind:sort={orderBy.name}
					on:filter={query}
				/>
				<StringTh
					name="password"
					bind:expression={args.password}
					bind:sort={orderBy.password}
					on:filter={query}
				/>
				<th>realm</th>
				<StringTh
					name="realmId"
					bind:expression={args.realmId}
					bind:sort={orderBy.realmId}
					on:filter={query}
				/>
				<th>roles</th>
				<th>rolesConnection</th>
				<TimestampTh
					name="updateTime"
					bind:expression={args.updateTime}
					bind:sort={orderBy.updateTime}
					on:filter={query}
				/>
				<StringTh
					name="updateUserId"
					bind:expression={args.updateUserId}
					bind:sort={orderBy.updateUserId}
					on:filter={query}
				/>
				<th>userGroup</th>
				<th>userGroupConnection</th>
				<th>userRole</th>
				<th>userRoleConnection</th>
				<IntTh
					name="version"
					bind:expression={args.version}
					bind:sort={orderBy.version}
					on:filter={query}
				/>
				<th />
			</tr>
		</thead>
		{#if isFetching}
			<TableLoading rows={pageSize} cols={15 + 2} />
		{:else}
			<tbody>
				{#if nodes && nodes.length > 0}
					{#each nodes as node, row}
						{#if node && node.id}
							<tr class="hover">
								<th class="z-10">
									<label>
										<input type="checkbox" class="checkbox" bind:checked={selectedRows[node.id]} />
									</label>
								</th>
								<StringTd
									name="createGroupId"
									bind:value={node.createGroupId}
									on:save={() => updateField({ id: node?.id, createGroupId: node?.createGroupId })}
									errors={errors[row]?.iterms?.createGroupId}
								/>
								<TimestampTd
									name="createTime"
									bind:value={node.createTime}
									on:save={() => updateField({ id: node?.id, createTime: node?.createTime })}
									errors={errors[row]?.iterms?.createTime}
								/>
								<StringTd
									name="createUserId"
									bind:value={node.createUserId}
									on:save={() => updateField({ id: node?.id, createUserId: node?.createUserId })}
									errors={errors[row]?.iterms?.createUserId}
								/>
								<BooleanTd
									name="disable"
									bind:value={node.disable}
									on:save={() => updateField({ id: node?.id, disable: node?.disable })}
									errors={errors[row]?.iterms?.disable}
								/>
								<StringTd
									name="email"
									bind:value={node.email}
									on:save={() => updateField({ id: node?.id, email: node?.email })}
									errors={errors[row]?.iterms?.email}
								/>
								<ObjectTd
									name="groups"
									errors={errors[row]?.iterms?.groups}
									path={`${node.id}/groups`}
									on:gotoField
								/>
								<ObjectTd
									name="groupsConnection"
									errors={errors[row]?.iterms?.groupsConnection}
									path={`${node.id}/groups-connection`}
									on:gotoField
								/>
								<IDTd name="id" bind:value={node.id} readonly errors={errors[row]?.iterms?.id} />
								<BooleanTd
									name="isDeprecated"
									bind:value={node.isDeprecated}
									on:save={() => updateField({ id: node?.id, isDeprecated: node?.isDeprecated })}
									errors={errors[row]?.iterms?.isDeprecated}
								/>
								<StringTd
									name="lastName"
									bind:value={node.lastName}
									on:save={() => updateField({ id: node?.id, lastName: node?.lastName })}
									errors={errors[row]?.iterms?.lastName}
								/>
								<StringTd
									name="login"
									bind:value={node.login}
									on:save={() => updateField({ id: node?.id, login: node?.login })}
									errors={errors[row]?.iterms?.login}
								/>
								<StringTd
									name="name"
									bind:value={node.name}
									on:save={() => updateField({ id: node?.id, name: node?.name })}
									errors={errors[row]?.iterms?.name}
								/>
								<StringTd
									name="password"
									bind:value={node.password}
									on:save={() => updateField({ id: node?.id, password: node?.password })}
									errors={errors[row]?.iterms?.password}
								/>
								<ObjectTd
									name="realm"
									errors={errors[row]?.iterms?.realm}
									path={`${node.id}/realm`}
									on:gotoField
								/>
								<StringTd
									name="realmId"
									bind:value={node.realmId}
									on:save={() => updateField({ id: node?.id, realmId: node?.realmId })}
									errors={errors[row]?.iterms?.realmId}
								/>
								<ObjectTd
									name="roles"
									errors={errors[row]?.iterms?.roles}
									path={`${node.id}/roles`}
									on:gotoField
								/>
								<ObjectTd
									name="rolesConnection"
									errors={errors[row]?.iterms?.rolesConnection}
									path={`${node.id}/roles-connection`}
									on:gotoField
								/>
								<TimestampTd
									name="updateTime"
									bind:value={node.updateTime}
									on:save={() => updateField({ id: node?.id, updateTime: node?.updateTime })}
									errors={errors[row]?.iterms?.updateTime}
								/>
								<StringTd
									name="updateUserId"
									bind:value={node.updateUserId}
									on:save={() => updateField({ id: node?.id, updateUserId: node?.updateUserId })}
									errors={errors[row]?.iterms?.updateUserId}
								/>
								<ObjectTd
									name="userGroup"
									errors={errors[row]?.iterms?.userGroup}
									path={`${node.id}/user-group`}
									on:gotoField
								/>
								<ObjectTd
									name="userGroupConnection"
									errors={errors[row]?.iterms?.userGroupConnection}
									path={`${node.id}/user-group-connection`}
									on:gotoField
								/>
								<ObjectTd
									name="userRole"
									errors={errors[row]?.iterms?.userRole}
									path={`${node.id}/user-role`}
									on:gotoField
								/>
								<ObjectTd
									name="userRoleConnection"
									errors={errors[row]?.iterms?.userRoleConnection}
									path={`${node.id}/user-role-connection`}
									on:gotoField
								/>
								<IntTd
									name="version"
									bind:value={node.version}
									on:save={() => updateField({ id: node?.id, version: node?.version })}
									errors={errors[row]?.iterms?.version}
								/>
								<td>
									<div class="tooltip" data-tip={$LL.components.graphql.table.editBtn()}>
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
									<div class="tooltip" data-tip={$LL.components.graphql.table.removeBtn()}>
										<button
											class="btn btn-square btn-ghost btn-xs"
											on:click={(e) => {
												e.preventDefault();
												messageBoxs.open({
													title: $LL.components.graphql.table.removeModalTitle(),
													buttonName: $LL.components.graphql.table.removeBtn(),
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
								</td>
							</tr>
						{/if}
					{/each}
				{/if}
			</tbody>
		{/if}
	</Table>
	<div class="divider" />
	<Pagination
		bind:pageNumber
		bind:pageSize
		{totalCount}
		on:pageChange={query}
		on:sizeChange={query}
	/>
</Card>
