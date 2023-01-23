<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import { IntTh, IntTd, StringTh, StringTd, TimestampTh, TimestampTd, BooleanTh, BooleanTd, IDTh, IDTd } from '@graphace/ui-graphql/components/table';
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
	import { Pagination } from '@graphace/ui/components/connection';
	import {
		Conditional,
		Operator,
		User,
		UserOrderBy,
		QueryTypeUserListArgs,
		MutationTypeUserArgs
	} from '~/gql/generated/schema';

	export let nodes: (User | null | undefined)[] | null | undefined;
	export let totalCount: number = 0;
	export let isFetching: boolean;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryTypeUserListArgs;
			then: (data: (User | null | undefined)[] | null | undefined) => void;
			catch: (error: Error) => void;
		};
		mutation: {
			args: MutationTypeUserArgs;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		};
	}>();

	let errors: Record<string, Record<string, Error>> = {};

	let showDeleteButton = false;
	let queryValue: string | undefined;
	let args: QueryTypeUserListArgs = {};
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
		if (queryValue) {
			args = {};
			args.cond = Conditional.OR;
			args.createGroupId = { opr: Operator.LK, val: `%${queryValue}%` };
			args.createUserId = { opr: Operator.LK, val: `%${queryValue}%` };
			args.login = { opr: Operator.LK, val: `%${queryValue}%` };
			args.name = { opr: Operator.LK, val: `%${queryValue}%` };
			args.password = { opr: Operator.LK, val: `%${queryValue}%` };
			args.phones = { opr: Operator.LK, val: `%${queryValue}%` };
			args.realmId = { opr: Operator.LK, val: `%${queryValue}%` };
			args.updateUserId = { opr: Operator.LK, val: `%${queryValue}%` };
			args.userDetail2 = { opr: Operator.LK, val: `%${queryValue}%` };
		} else {
			if (Object.keys(orderBy).length > 0) {
				args.orderBy = orderBy;
			} else {
				args.orderBy = undefined;
			}
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
	<SearchInput bind:value={queryValue} on:search={query} />
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
				goto('./user/+');
			} }
		>
			<Icon src={Plus} class="h-6 w-6" solid />
		</button>
	</div>
	<button
		class="hidden md:btn"
		on:click={(e) => {
			e.preventDefault();
			goto('./user/+');
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
			<BooleanTh
				name="isDeprecated"
				bind:expression={args.isDeprecated}
				bind:sort={orderBy.isDeprecated}
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
				bind:sort={orderBy.phones}
				on:filter={query}
			/>
			<StringTh
				name="realmId"
				bind:expression={args.realmId}
				bind:sort={orderBy.realmId}
				on:filter={query}
			/>
			<SexTh
				name="sex"
				bind:expression={args.sex}
				bind:sort={orderBy.sex}
				on:filter={query}
			/>
			<IntTh
				name="test1"
				bind:expression={args.test1}
				bind:sort={orderBy.test1}
				on:filter={query}
			/>
			<BooleanTh
				name="test2"
				bind:expression={args.test2}
				bind:sort={orderBy.test2}
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
			<StringTh
				name="userDetail2"
				bind:expression={args.userDetail2}
				bind:sort={orderBy.userDetail2}
				on:filter={query}
			/>
			<IntTh
				name="version"
				bind:expression={args.version}
				bind:sort={orderBy.version}
				on:filter={query}
			/>
			<td />
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading />
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
								on:save={() => updateField({ : node?., age: node?.age })}
								error={errors[node.]?.age}
							/>
							<StringTd
								name="createGroupId"
								bind:value={node.createGroupId}
								on:save={() => updateField({ : node?., createGroupId: node?.createGroupId })}
								error={errors[node.]?.createGroupId}
							/>
							<TimestampTd
								name="createTime"
								bind:value={node.createTime}
								on:save={() => updateField({ : node?., createTime: node?.createTime })}
								error={errors[node.]?.createTime}
							/>
							<StringTd
								name="createUserId"
								bind:value={node.createUserId}
								on:save={() => updateField({ : node?., createUserId: node?.createUserId })}
								error={errors[node.]?.createUserId}
							/>
							<BooleanTd
								name="disable"
								bind:value={node.disable}
								on:save={() => updateField({ : node?., disable: node?.disable })}
								error={errors[node.]?.disable}
							/>
							<IDTd
								name="id"
								bind:value={node.id}
								on:save={() => updateField({ : node?., id: node?.id })}
								error={errors[node.]?.id}
							/>
							<BooleanTd
								name="isDeprecated"
								bind:value={node.isDeprecated}
								on:save={() => updateField({ : node?., isDeprecated: node?.isDeprecated })}
								error={errors[node.]?.isDeprecated}
							/>
							<StringTd
								name="login"
								bind:value={node.login}
								on:save={() => updateField({ : node?., login: node?.login })}
								error={errors[node.]?.login}
							/>
							<StringTd
								name="name"
								bind:value={node.name}
								on:save={() => updateField({ : node?., name: node?.name })}
								error={errors[node.]?.name}
							/>
							<IntTd
								name="organizationId"
								bind:value={node.organizationId}
								on:save={() => updateField({ : node?., organizationId: node?.organizationId })}
								error={errors[node.]?.organizationId}
							/>
							<StringTd
								name="password"
								bind:value={node.password}
								on:save={() => updateField({ : node?., password: node?.password })}
								error={errors[node.]?.password}
							/>
							<StringTd
								name="phones"
								bind:value={node.phones}
								on:save={() => updateField({ : node?., phones: node?.phones })}
								error={errors[node.]?.phones}
							/>
							<StringTd
								name="realmId"
								bind:value={node.realmId}
								on:save={() => updateField({ : node?., realmId: node?.realmId })}
								error={errors[node.]?.realmId}
							/>
							<SexTd
								name="sex"
								bind:value={node.sex}
								on:save={() => updateField({ : node?., sex: node?.sex })}
								error={errors[node.]?.sex}
							/>
							<IntTd
								name="test1"
								bind:value={node.test1}
								on:save={() => updateField({ : node?., test1: node?.test1 })}
								error={errors[node.]?.test1}
							/>
							<BooleanTd
								name="test2"
								bind:value={node.test2}
								on:save={() => updateField({ : node?., test2: node?.test2 })}
								error={errors[node.]?.test2}
							/>
							<TimestampTd
								name="updateTime"
								bind:value={node.updateTime}
								on:save={() => updateField({ : node?., updateTime: node?.updateTime })}
								error={errors[node.]?.updateTime}
							/>
							<StringTd
								name="updateUserId"
								bind:value={node.updateUserId}
								on:save={() => updateField({ : node?., updateUserId: node?.updateUserId })}
								error={errors[node.]?.updateUserId}
							/>
							<StringTd
								name="userDetail2"
								bind:value={node.userDetail2}
								on:save={() => updateField({ : node?., userDetail2: node?.userDetail2 })}
								error={errors[node.]?.userDetail2}
							/>
							<IntTd
								name="version"
								bind:value={node.version}
								on:save={() => updateField({ : node?., version: node?.version })}
								error={errors[node.]?.version}
							/>
							<td>
								<div class="tooltip" data-tip={$LL.components.graphql.table.editBtn()}>
									<button
										class="btn btn-square btn-ghost btn-xs"
										on:click={(e) => {
											e.preventDefault();
											if (node) {
												goto(`./user/${node.id}`);
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
<div class="divider" />
<Pagination
	bind:pageNumber
	bind:pageSize
	{totalCount}
	on:pageChange={query}
	on:sizeChange={query}
/>
