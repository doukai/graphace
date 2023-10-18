<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { ObjectTd, StringTh, StringTd, BooleanTh, BooleanTd } from '@graphace/ui-graphql/components/table';
	import GroupTh from '~/lib/components/objects/group/GroupTh.svelte';
	import RoleTh from '~/lib/components/objects/role/RoleTh.svelte';
	import RealmTh from '~/lib/components/objects/realm/RealmTh.svelte';
	import { Table, TableHead, TableLoading, TableEmpty } from '@graphace/ui/components/table';
	import { Pagination } from '@graphace/ui/components/connection';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilSquare, Trash, ArchiveBoxXMark } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		User,
		UserOrderBy,
		QueryUserConnectionArgs,
		UserInput
	} from '~/lib/types/schema';
	import { auth } from '@graphace/commons/stores/useAuth';

	export let nodes: (User | null | undefined)[] | null | undefined;
	export let totalCount: number = 0;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let showSaveButton: boolean = true;
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showBackButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryUserConnectionArgs;
			then: (data: (User | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: UserInput;
			then: (data: User | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: UserInput[];
			then: (data: User[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		edit: { id: string };
		create: {};
		save: { nodes: (User | null | undefined)[] | null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	let args: QueryUserConnectionArgs = {};
	let orderBy: UserOrderBy = {};
	let after: string | undefined;
	let before: string | undefined;
	let pageNumber: number = 1;
	let pageSize: number = 10;

	let selectAll: boolean;
	let selectedIdList: (string | null)[] = [];

	const query = () => {
		pageNumber = 1;
		queryPage();
	};

	const queryPage = () => {
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
		} else {
			args.offset = (pageNumber - 1) * pageSize;
			args.first = pageSize;
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
		let args: QueryUserConnectionArgs = {};
		if (searchValue) {
			args.cond = 'OR';
			args.name = { opr: 'LK', val: `%${searchValue}%` };
			args.lastName = { opr: 'LK', val: `%${searchValue}%` };
			args.login = { opr: 'LK', val: `%${searchValue}%` };
			args.email = { opr: 'LK', val: `%${searchValue}%` };
			args.phones = { opr: 'LK', val: `%${searchValue}%` };
		} else {
			args.cond = undefined;
			args.name = undefined;
			args.lastName = undefined;
			args.login = undefined;
			args.email = undefined;
			args.phones = undefined;
		}
		
		if (after) {
			args.after = after;
			args.first = pageSize;
		} else if (before) {
			args.before = before;
			args.last = pageSize;
		} else {
			args.offset = (pageNumber - 1) * pageSize;
			args.first = pageSize;
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

	const updateField = (args: UserInput | null | undefined) => {
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
	};

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
	};

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
				.map((id) => nodes?.find((node) => node?.id === id))
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

<TableHead
	title={$LL.graphql.objects.User.name()}
	showRemoveButton={auth('User::*::WRITE') && showRemoveButton && selectedIdList.length > 0}
	showUnbindButton={auth('User::*::WRITE') && showUnbindButton && selectedIdList.length > 0}
	showSaveButton={auth('User::*::WRITE') && showSaveButton}
	showGotoSelectButton={auth('User::*::WRITE') && showGotoSelectButton}
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
			{#if auth('User::name::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.name.name()}
				bind:expression={args.name}
				bind:sort={orderBy.name}
				on:filter={query}
			/>
			{/if}
			{#if auth('User::lastName::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.lastName.name()}
				bind:expression={args.lastName}
				bind:sort={orderBy.lastName}
				on:filter={query}
			/>
			{/if}
			{#if auth('User::login::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.login.name()}
				bind:expression={args.login}
				bind:sort={orderBy.login}
				on:filter={query}
			/>
			{/if}
			{#if auth('User::email::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.email.name()}
				bind:expression={args.email}
				bind:sort={orderBy.email}
				on:filter={query}
			/>
			{/if}
			{#if auth('User::phones::*')}
			<StringTh
				name={$LL.graphql.objects.User.fields.phones.name()}
				bind:expression={args.phones}
				on:filter={query}
			/>
			{/if}
			{#if auth('User::disable::*')}
			<BooleanTh
				name={$LL.graphql.objects.User.fields.disable.name()}
				bind:expression={args.disable}
				bind:sort={orderBy.disable}
				on:filter={query}
			/>
			{/if}
			{#if auth('User::groups::*')}
			<GroupTh
				name={$LL.graphql.objects.User.fields.groups.name()}
				bind:expression={args.groups}
				on:filter={query}
			/>
			{/if}
			{#if auth('User::roles::*')}
			<RoleTh
				name={$LL.graphql.objects.User.fields.roles.name()}
				bind:expression={args.roles}
				on:filter={query}
			/>
			{/if}
			{#if auth('User::realm::*')}
			<RealmTh
				name={$LL.graphql.objects.User.fields.realm.name()}
				bind:expression={args.realm}
				on:filter={query}
			/>
			{/if}
			{#if auth('User::*::WRITE')}
			<th />
			{/if}
		</tr>
	</thead>
	{#if isFetching}
		<TableLoading rows={pageSize} cols={9 + 2}/>
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
							{#if auth('User::name::*')}
							<StringTd
								name="name"
								bind:value={node.name}
								on:save={() => updateField({ name: node?.name, where: { id: { val: node?.id } } })}
								readonly={!auth('User::name::WRITE')}
								errors={errors[row]?.iterms?.name}
							/>
							{/if}
							{#if auth('User::lastName::*')}
							<StringTd
								name="lastName"
								bind:value={node.lastName}
								on:save={() => updateField({ lastName: node?.lastName, where: { id: { val: node?.id } } })}
								readonly={!auth('User::lastName::WRITE')}
								errors={errors[row]?.iterms?.lastName}
							/>
							{/if}
							{#if auth('User::login::*')}
							<StringTd
								name="login"
								bind:value={node.login}
								on:save={() => updateField({ login: node?.login, where: { id: { val: node?.id } } })}
								readonly={!auth('User::login::WRITE')}
								errors={errors[row]?.iterms?.login}
							/>
							{/if}
							{#if auth('User::email::*')}
							<StringTd
								name="email"
								bind:value={node.email}
								on:save={() => updateField({ email: node?.email, where: { id: { val: node?.id } } })}
								readonly={!auth('User::email::WRITE')}
								errors={errors[row]?.iterms?.email}
							/>
							{/if}
							{#if auth('User::phones::*')}
							<StringTd
								name="phones"
								bind:value={node.phones}
								list
								on:save={() => updateField({ phones: node?.phones, where: { id: { val: node?.id } } })}
								readonly={!auth('User::phones::WRITE')}
								errors={errors[row]?.iterms?.phones}
							/>
							{/if}
							{#if auth('User::disable::*')}
							<BooleanTd
								name="disable"
								bind:value={node.disable}
								on:save={() => updateField({ disable: node?.disable, where: { id: { val: node?.id } } })}
								readonly={!auth('User::disable::WRITE')}
								errors={errors[row]?.iterms?.disable}
							/>
							{/if}
							{#if auth('User::groups::*')}
							<ObjectTd name="groups" errors={errors[row]?.iterms?.groups} path={`${node.id}/groups`} on:gotoField />
							{/if}
							{#if auth('User::roles::*')}
							<ObjectTd name="roles" errors={errors[row]?.iterms?.roles} path={`${node.id}/roles`} on:gotoField />
							{/if}
							{#if auth('User::realm::*')}
							<ObjectTd name="realm" errors={errors[row]?.iterms?.realm} path={`${node.id}/realm`} on:gotoField />
							{/if}
							{#if auth('User::*::WRITE')}
							<th class="z-10 hover:z-30 w-24">
								<div class="flex space-x-1">
									<div class="tooltip" data-tip={$LL.web.components.table.editBtn()}>
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
				<TableEmpty cols={9 + 2}/>
			{/if}
		</tbody>
	{/if}
</Table>
<div class="divider" />
<Pagination
	bind:pageNumber
	bind:pageSize
	{totalCount}
	on:pageChange={queryPage}
	on:sizeChange={queryPage}
/>