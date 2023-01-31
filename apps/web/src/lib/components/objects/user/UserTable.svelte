<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Error } from '@graphace/commons/types';
	import { IntTh, IntTd, StringTh, StringTd, TimestampTh, TimestampTd, BooleanTh, BooleanTd, IDTh, IDTd } from '@graphace/ui-graphql/components/table';
	import SexTh from '~/lib/components/enums/sex/SexTh.svelte';
	import SexTd from '~/lib/components/enums/sex/SexTd.svelte';
	import { SectionHead } from '@graphace/ui/components/section';
	import { Table, TableLoading } from '@graphace/ui/components/table';
	import SearchInput from '@graphace/ui/components/search/SearchInput.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus, PencilAlt, Trash } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	import { locale } from '~/i18n/i18n-svelte';
	import { validateUpdate } from '@graphace/graphql/schema/JsonSchema';
	import {
		Conditional,
		Operator,
		User,
		UserOrderBy,
		QueryTypeUserListArgs,
		MutationTypeUserArgs
	} from '~/lib/types/schema';

	export let nodes: (User | null | undefined)[] | null | undefined;
	export let isFetching: boolean;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryTypeUserListArgs;
			then: (data: (User | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		};
		mutation: {
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		};
		edit: { id: string };
		create: {};
	}>();

	let errors: Record<string, Record<string, Error>> = {};

	let showDeleteButton = false;
	let searchValue: string | undefined;
	let args: QueryTypeUserListArgs = {};
	let orderBy: UserOrderBy = {};

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
			catch: (error) => {
				notifications.error($LL.message.requestFailed());
			}
		});
	};

	const search = () => {
		let args: QueryTypeUserListArgs = {};
		if (searchValue) {
			args.cond = Conditional.OR;
			args.createGroupId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.createUserId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.login = { opr: Operator.LK, val: `%${searchValue}%` };
			args.name = { opr: Operator.LK, val: `%${searchValue}%` };
			args.password = { opr: Operator.LK, val: `%${searchValue}%` };
			args.phones = { opr: Operator.LK, val: `%${searchValue}%` };
			args.realmId = { opr: Operator.LK, val: `%${searchValue}%` };
			args.updateUserId = { opr: Operator.LK, val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.createGroupId = undefined;
			args.createUserId = undefined;
			args.login = undefined;
			args.name = undefined;
			args.password = undefined;
			args.phones = undefined;
			args.realmId = undefined;
			args.updateUserId = undefined;
		}

		dispatch('fetch', {
			args,
			then: (data) => {},
			catch: (error) => {
				notifications.error($LL.message.requestFailed());
			}
		});
	};

	async function updateField(args: MutationTypeUserArgs | null | undefined) {
		if (args && args.id) {
			errors[args.id] = {};
			validateUpdate('User', args, $locale)
				.then((data) => {
					if (args) {
						dispatch('mutation', {
							args,
							then: (data) => {
								notifications.success($LL.message.saveSuccess());
							},
							catch: (error) => {
								console.error(error);
								notifications.error($LL.message.saveFailed());
							}
						});
					}
				})
				.catch((validErrors) => {
					if (args.id) {
						errors[args.id] = validErrors;
					}
				});
		}
	}

	async function removeRow(id: string) {
		dispatch('mutation', {
			args: { id: id, isDeprecated: true },
			update: true,
			then: (data) => {
				notifications.success($LL.message.removeSuccess());
				query();
			},
			catch: (error) => {
				console.error(error);
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
			catch: (error) => {
				console.error(error);
				notifications.error($LL.message.removeFailed());
			}
		});
	};
</script>

<SectionHead title="User">
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
	<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.remove()}>
		<button
			class="btn btn-square md:hidden"
			on:click={(e) => {
				e.preventDefault();
				dispatch('create');
			} }
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
									if (node?.id) {
										selectedRows[node.id] = selectAll;
									}
								});
							}
						}}
					/>
				</label>
			</th>
			<IntTh
				name="age"
				bind:expression={args.age}
				bind:sort={orderBy.age}
				on:filter={query}
			/>
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
			<IDTh
				name="id"
				bind:expression={args.id}
				bind:sort={orderBy.id}
				on:filter={query}
			/>
			<th>isDeprecated</th>
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
			<th>organization</th>
			<IntTh
				name="organizationId"
				bind:expression={args.organizationId}
				bind:sort={orderBy.organizationId}
				on:filter={query}
			/>
			<StringTh
				name="password"
				bind:expression={args.password}
				bind:sort={orderBy.password}
				on:filter={query}
			/>
			<StringTh
				name="phones"
				bind:expression={args.phones}
				on:filter={query}
			/>
			<StringTh
				name="realmId"
				bind:expression={args.realmId}
				bind:sort={orderBy.realmId}
				on:filter={query}
			/>
			<th>roles</th>
			<th>rolesConnection</th>
			<SexTh
				name="sex"
				bind:expression={args.sex}
				bind:sort={orderBy.sex}
				on:filter={query}
			/>
			<IntTh
				name="test1"
				bind:expression={args.test1}
				on:filter={query}
			/>
			<BooleanTh
				name="test2"
				bind:expression={args.test2}
				on:filter={query}
			/>
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
			<th>userDetail2</th>
			<th>userProfile</th>
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
		<TableLoading rows={10} cols={20 + 2}/>
	{:else}
		<tbody>
			{#if nodes && nodes.length > 0}
				{#each nodes as node}
					{#if node && node.id}
						<tr class="hover">
							<th class="z-10">
								<label>
									<input type="checkbox" class="checkbox" bind:checked={selectedRows[node.id]} />
								</label>
							</th>
							<IntTd
								name="age"
								bind:value={node.age}
								on:save={() => updateField({ id: node?.id, age: node?.age })}
								error={errors[node.id]?.age}
							/>
							<StringTd
								name="createGroupId"
								bind:value={node.createGroupId}
								on:save={() => updateField({ id: node?.id, createGroupId: node?.createGroupId })}
								error={errors[node.id]?.createGroupId}
							/>
							<TimestampTd
								name="createTime"
								bind:value={node.createTime}
								on:save={() => updateField({ id: node?.id, createTime: node?.createTime })}
								error={errors[node.id]?.createTime}
							/>
							<StringTd
								name="createUserId"
								bind:value={node.createUserId}
								on:save={() => updateField({ id: node?.id, createUserId: node?.createUserId })}
								error={errors[node.id]?.createUserId}
							/>
							<BooleanTd
								name="disable"
								bind:value={node.disable}
								on:save={() => updateField({ id: node?.id, disable: node?.disable })}
								error={errors[node.id]?.disable}
							/>
							<td>{node.id}</td>
							<BooleanTd
								name="isDeprecated"
								bind:value={node.isDeprecated}
								on:save={() => updateField({ id: node?.id, isDeprecated: node?.isDeprecated })}
								error={errors[node.id]?.isDeprecated}
							/>
							<StringTd
								name="login"
								bind:value={node.login}
								on:save={() => updateField({ id: node?.id, login: node?.login })}
								error={errors[node.id]?.login}
							/>
							<StringTd
								name="name"
								bind:value={node.name}
								on:save={() => updateField({ id: node?.id, name: node?.name })}
								error={errors[node.id]?.name}
							/>
							<ObjectTd path={`${node.id}/organization`} on:gotoField />
							<IntTd
								name="organizationId"
								bind:value={node.organizationId}
								on:save={() => updateField({ id: node?.id, organizationId: node?.organizationId })}
								error={errors[node.id]?.organizationId}
							/>
							<StringTd
								name="password"
								bind:value={node.password}
								on:save={() => updateField({ id: node?.id, password: node?.password })}
								error={errors[node.id]?.password}
							/>
							<StringTd
								name="phones"
								bind:value={node.phones}
								on:save={() => updateField({ id: node?.id, phones: node?.phones })}
								error={errors[node.id]?.phones}
							/>
							<StringTd
								name="realmId"
								bind:value={node.realmId}
								on:save={() => updateField({ id: node?.id, realmId: node?.realmId })}
								error={errors[node.id]?.realmId}
							/>
							<ObjectTd path={`${node.id}/roles`} on:gotoField />
							<ObjectTd path={`${node.id}/roles-connection`} on:gotoField />
							<SexTd
								name="sex"
								bind:value={node.sex}
								on:save={() => updateField({ id: node?.id, sex: node?.sex })}
								error={errors[node.id]?.sex}
							/>
							<IntTd
								name="test1"
								bind:value={node.test1}
								on:save={() => updateField({ id: node?.id, test1: node?.test1 })}
								error={errors[node.id]?.test1}
							/>
							<BooleanTd
								name="test2"
								bind:value={node.test2}
								on:save={() => updateField({ id: node?.id, test2: node?.test2 })}
								error={errors[node.id]?.test2}
							/>
							<TimestampTd
								name="updateTime"
								bind:value={node.updateTime}
								on:save={() => updateField({ id: node?.id, updateTime: node?.updateTime })}
								error={errors[node.id]?.updateTime}
							/>
							<StringTd
								name="updateUserId"
								bind:value={node.updateUserId}
								on:save={() => updateField({ id: node?.id, updateUserId: node?.updateUserId })}
								error={errors[node.id]?.updateUserId}
							/>
							<td>{node.userDetail2}</td>
							<ObjectTd path={`${node.id}/user-profile`} on:gotoField />
							<IntTd
								name="version"
								bind:value={node.version}
								on:save={() => updateField({ id: node?.id, version: node?.version })}
								error={errors[node.id]?.version}
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
