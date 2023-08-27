<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { StringTh, StringTd } from '@graphace/ui-graphql/components/table';
	import { Card } from '@graphace/ui/components/card';
	import { Table, TableHead, TableLoading, TableEmpty } from '@graphace/ui/components/table';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArchiveBoxArrowDown } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	import type {
		Realm,
		RealmOrderBy,
		QueryTypeRealmListArgs,
		MutationTypeRealmArgs
	} from '~/lib/types/schema';

	export let nodes: (Realm | null | undefined)[] | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<number, Errors> = {};
	export let multipleSelect: boolean = true;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: QueryTypeRealmListArgs;
			then: (data: (Realm | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		mutation: {
			args: MutationTypeRealmArgs;
			update?: boolean;
			then: (data: Realm | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		select: {
			selected: MutationTypeRealmArgs | null | undefined | (MutationTypeRealmArgs | null | undefined)[];
			then: () => void;
			catch: (errors: GraphQLError[]) => void;
		};
		back: {};
	}>();

	let showSelectButton = false;
	let args: QueryTypeRealmListArgs = {};
	let orderBy: RealmOrderBy = {};

	let selectAll: boolean;
	let selectedIdList: string | null | undefined | (string | null | undefined)[] = multipleSelect
		? []
		: undefined;

	$: if (selectedIdList && !Array.isArray(selectedIdList) || Array.isArray(selectedIdList) && selectedIdList.length > 0) {
		showSelectButton = true;
	} else {
		showSelectButton = false;
	}

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
		let args: QueryTypeRealmListArgs = {};
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

	const updateField = (args: MutationTypeRealmArgs | null | undefined) => {
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
</script>

<Card>
	<TableHead
		title={$LL.graphql.objects.Realm.name()}
		showCreateButton={false}
		showSaveButton={false}
		showRemoveButton={false}
		{showSelectButton}
		{showBackButton}
		on:search={(e) => search(e.detail.value)}
		on:select={() =>
			dispatch('select', {
				selected: Array.isArray(selectedIdList)
					? selectedIdList.flatMap((id) => nodes?.find((node) => node?.id === id))
					: nodes?.find((node) => node?.id === selectedIdList),
				then: () => {
					notifications.success($LL.web.message.saveSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.saveFailed());
				}
			})}
		on:back
	/>
	<div class="divider" />
	<Table>
		<thead>
			<tr class="z-20">
				<th class="w-12">
					{#if multipleSelect}
						<label>
							<input
								type="checkbox"
								class="checkbox"
								bind:checked={selectAll}
								on:change={() => {
									if (nodes && nodes.length > 0) {
										selectedIdList = selectAll ? nodes.map((node) => node?.id) : [];
									}
								}}
							/>
						</label>
					{/if}
				</th>
				<StringTh
					name={$LL.graphql.objects.Realm.fields.name.name()}
					bind:expression={args.name}
					bind:sort={orderBy.name}
					on:filter={query}
				/>
				<th />
			</tr>
		</thead>
		{#if isFetching}
			<TableLoading rows={10} cols={1 + 2}/>
		{:else}
			<tbody>
				{#if nodes && nodes.length > 0}
					{#each nodes as node, row}
						{#if node && node.id}
							<tr class="hover">
								<th class="z-10 w-12">
									<label>
										{#if multipleSelect}
											<input type="checkbox" class="checkbox" bind:group={selectedIdList} value={node.id} />
										{:else}
											<input type="radio" class="radio" bind:group={selectedIdList} value={node.id} />
										{/if}
									</label>
								</th>
								<StringTd
									name="name"
									bind:value={node.name}
									on:save={() => updateField({ id: node?.id, name: node?.name })}
									errors={errors[row]?.iterms?.name}
								/>
								<th class="z-10 w-12">
									<div class="flex space-x-1">
										<div class="tooltip" data-tip={$LL.web.components.table.selectBtn()}>
											<button
												class="btn btn-square btn-ghost btn-xs"
												on:click={(e) => {
													e.preventDefault();
													if (node && node.id) {
														dispatch('select', {
															selected: multipleSelect ? [node] : node,
															then: () => {
																notifications.success($LL.web.message.saveSuccess());
																dispatch('back');
															},
															catch: (errors) => {
																console.error(errors);
																notifications.error($LL.web.message.saveFailed());
															}
														});
													}
												}}
											>
												<Icon src={ArchiveBoxArrowDown} solid />
											</button>
										</div>
									</div>
								</th>
							</tr>
						{/if}
					{/each}
				{:else}
					<TableEmpty cols={1 + 2}/>
				{/if}
			</tbody>
		{/if}
	</Table>
</Card>
