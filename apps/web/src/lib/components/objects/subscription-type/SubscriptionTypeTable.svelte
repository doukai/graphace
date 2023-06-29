<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons/types';
	import { ObjectTd, StringTh, StringTd, TimestampTh, TimestampTd, BooleanTh, BooleanTd, IntTh, IntTd } from '@graphace/ui-graphql/components/table';
	import { SectionHead } from '@graphace/ui/components/section';
	import { Table, TableLoading } from '@graphace/ui/components/table';
	import SearchInput from '@graphace/ui/components/search/SearchInput.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus, PencilAlt, Trash, ChevronLeft } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	import {
		Conditional,
		Operator,
		SubscriptionType,
		SubscriptionTypeOrderBy,
		QueryTypeSubscriptionTypeListArgs,
		MutationTypeSubscriptionTypeArgs
	} from '~/lib/types/schema';

	export let nodes: (SubscriptionType | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryTypeSubscriptionTypeListArgs;
			then: (data: (SubscriptionType | null | undefined)[] | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		mutation: {
			args: MutationTypeSubscriptionTypeArgs;
			update?: boolean;
			then: (data: SubscriptionType | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (SubscriptionType | null | undefined)[] | null | undefined };
		back: {};
	}>();

	let showDeleteButton = false;
	let searchValue: string | undefined;
	let args: QueryTypeSubscriptionTypeListArgs = {};
	let orderBy: SubscriptionTypeOrderBy = {};

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
		let args: QueryTypeSubscriptionTypeListArgs = {};
		if (searchValue) {
			args.cond = Conditional.OR;
		} else {
			args.cond = undefined;
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

	const updateField = (args: MutationTypeSubscriptionTypeArgs | null | undefined) => {
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
	}

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
	}

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

<SectionHead title="SubscriptionType">
	<SearchInput bind:value={searchValue} on:search={search} />
	{#if showDeleteButton}
		<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.remove()}>
			<button
				class="btn btn-error btn-outline btn-square"
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
	{/if}
	<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.create()}>
		<button
			class="btn btn-square md:hidden"
			on:click={(e) => {
				e.preventDefault();
				dispatch('create');
			}}
		>
			<Icon src={Plus} class="h-6 w-6" solid />
		</button>
	</div>
	<button
		class="hidden md:btn"
		on:click={(e) => {
			e.preventDefault();
			dispatch('create');
		}}
	>
		{$LL.routers.type.create()}
	</button>
	<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.back()}>
		<button
			class="btn btn-square md:hidden"
			on:click={(e) => {
				e.preventDefault();
				dispatch('back');
			}}
		>
			<Icon src={ChevronLeft} class="h-6 w-6" solid />
		</button>
	</div>
	<button
		class="hidden md:btn"
		on:click={(e) => {
			e.preventDefault();
			dispatch('back');
		}}
	>
		{$LL.routers.type.back()}
	</button>
	<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.save()}>
		<button
			class="btn btn-square md:hidden"
			on:click={(e) => {
				e.preventDefault();
				dispatch('save', { nodes });
			}}
		>
			<Icon src={ChevronLeft} class="h-6 w-6" solid />
		</button>
	</div>
	<button
		class="hidden md:btn"
		on:click={(e) => {
			e.preventDefault();
			dispatch('save', { nodes });
		}}
	>
		{$LL.routers.type.save()}
	</button>
</SectionHead>
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
									if (node?.) {
										selectedRows[node.] = selectAll;
									}
								});
							}
						}}
					/>
				</label>
			</th>
			<th>createGroupId</th>
			<th>createTime</th>
			<th>createUserId</th>
			<th>group</th>
			<th>groupConnection</th>
			<th>groupList</th>
			<th>groupRole</th>
			<th>groupRoleConnection</th>
			<th>groupRoleList</th>
			<th>isDeprecated</th>
			<th>permission</th>
			<th>permissionConnection</th>
			<th>permissionList</th>
			<th>realm</th>
			<th>realmConnection</th>
			<th>realmId</th>
			<th>realmList</th>
			<th>role</th>
			<th>roleComposite</th>
			<th>roleCompositeConnection</th>
			<th>roleCompositeList</th>
			<th>roleConnection</th>
			<th>roleList</th>
			<th>updateTime</th>
			<th>updateUserId</th>
			<th>user</th>
			<th>userConnection</th>
			<th>userGroup</th>
			<th>userGroupConnection</th>
			<th>userGroupList</th>
			<th>userList</th>
			<th>userRole</th>
			<th>userRoleConnection</th>
			<th>userRoleList</th>
			<th>version</th>
			<th />
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={10} cols={8 + 2}/>
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node, row}
					{#if node && node.}
						<tr class="hover">
							<th class="z-10">
								<label>
									<input type="checkbox" class="checkbox" bind:checked={selectedRows[node.]} />
								</label>
							</th>
							<StringTd
								name="createGroupId"
								bind:value={node.createGroupId}
								readonly
								errors={errors[row]?.iterms?.createGroupId}
							/>
							<TimestampTd
								name="createTime"
								bind:value={node.createTime}
								readonly
								errors={errors[row]?.iterms?.createTime}
							/>
							<StringTd
								name="createUserId"
								bind:value={node.createUserId}
								readonly
								errors={errors[row]?.iterms?.createUserId}
							/>
							<ObjectTd name="group" errors={errors[row]?.iterms?.group} path={`${node.}/group`} on:gotoField />
							<ObjectTd name="groupConnection" errors={errors[row]?.iterms?.groupConnection} path={`${node.}/group-connection`} on:gotoField />
							<ObjectTd name="groupList" errors={errors[row]?.iterms?.groupList} path={`${node.}/group-list`} on:gotoField />
							<ObjectTd name="groupRole" errors={errors[row]?.iterms?.groupRole} path={`${node.}/group-role`} on:gotoField />
							<ObjectTd name="groupRoleConnection" errors={errors[row]?.iterms?.groupRoleConnection} path={`${node.}/group-role-connection`} on:gotoField />
							<ObjectTd name="groupRoleList" errors={errors[row]?.iterms?.groupRoleList} path={`${node.}/group-role-list`} on:gotoField />
							<BooleanTd
								name="isDeprecated"
								bind:value={node.isDeprecated}
								readonly
								errors={errors[row]?.iterms?.isDeprecated}
							/>
							<ObjectTd name="permission" errors={errors[row]?.iterms?.permission} path={`${node.}/permission`} on:gotoField />
							<ObjectTd name="permissionConnection" errors={errors[row]?.iterms?.permissionConnection} path={`${node.}/permission-connection`} on:gotoField />
							<ObjectTd name="permissionList" errors={errors[row]?.iterms?.permissionList} path={`${node.}/permission-list`} on:gotoField />
							<ObjectTd name="realm" errors={errors[row]?.iterms?.realm} path={`${node.}/realm`} on:gotoField />
							<ObjectTd name="realmConnection" errors={errors[row]?.iterms?.realmConnection} path={`${node.}/realm-connection`} on:gotoField />
							<StringTd
								name="realmId"
								bind:value={node.realmId}
								readonly
								errors={errors[row]?.iterms?.realmId}
							/>
							<ObjectTd name="realmList" errors={errors[row]?.iterms?.realmList} path={`${node.}/realm-list`} on:gotoField />
							<ObjectTd name="role" errors={errors[row]?.iterms?.role} path={`${node.}/role`} on:gotoField />
							<ObjectTd name="roleComposite" errors={errors[row]?.iterms?.roleComposite} path={`${node.}/role-composite`} on:gotoField />
							<ObjectTd name="roleCompositeConnection" errors={errors[row]?.iterms?.roleCompositeConnection} path={`${node.}/role-composite-connection`} on:gotoField />
							<ObjectTd name="roleCompositeList" errors={errors[row]?.iterms?.roleCompositeList} path={`${node.}/role-composite-list`} on:gotoField />
							<ObjectTd name="roleConnection" errors={errors[row]?.iterms?.roleConnection} path={`${node.}/role-connection`} on:gotoField />
							<ObjectTd name="roleList" errors={errors[row]?.iterms?.roleList} path={`${node.}/role-list`} on:gotoField />
							<TimestampTd
								name="updateTime"
								bind:value={node.updateTime}
								readonly
								errors={errors[row]?.iterms?.updateTime}
							/>
							<StringTd
								name="updateUserId"
								bind:value={node.updateUserId}
								readonly
								errors={errors[row]?.iterms?.updateUserId}
							/>
							<ObjectTd name="user" errors={errors[row]?.iterms?.user} path={`${node.}/user`} on:gotoField />
							<ObjectTd name="userConnection" errors={errors[row]?.iterms?.userConnection} path={`${node.}/user-connection`} on:gotoField />
							<ObjectTd name="userGroup" errors={errors[row]?.iterms?.userGroup} path={`${node.}/user-group`} on:gotoField />
							<ObjectTd name="userGroupConnection" errors={errors[row]?.iterms?.userGroupConnection} path={`${node.}/user-group-connection`} on:gotoField />
							<ObjectTd name="userGroupList" errors={errors[row]?.iterms?.userGroupList} path={`${node.}/user-group-list`} on:gotoField />
							<ObjectTd name="userList" errors={errors[row]?.iterms?.userList} path={`${node.}/user-list`} on:gotoField />
							<ObjectTd name="userRole" errors={errors[row]?.iterms?.userRole} path={`${node.}/user-role`} on:gotoField />
							<ObjectTd name="userRoleConnection" errors={errors[row]?.iterms?.userRoleConnection} path={`${node.}/user-role-connection`} on:gotoField />
							<ObjectTd name="userRoleList" errors={errors[row]?.iterms?.userRoleList} path={`${node.}/user-role-list`} on:gotoField />
							<IntTd
								name="version"
								bind:value={node.version}
								readonly
								errors={errors[row]?.iterms?.version}
							/>
							<td>
								<div class="tooltip" data-tip={$LL.components.graphql.table.editBtn()}>
									<button
										class="btn btn-square btn-ghost btn-xs"
										on:click={(e) => {
											e.preventDefault();
											if (node && node.) {
												dispatch('edit', { id: node. });
											}
										}}
									>
										<Icon src={PencilAlt} solid />
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
													if (node?.) {
														removeRow(node.);
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
