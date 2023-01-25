<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Form, FormLoading, FormItems, FormItem, FormButtons } from '@graphace/ui/components/form';
	import { StringItem, TimestampItem, BooleanItem, IntItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import LL from '~/i18n/i18n-svelte';
	import { locale } from '~/i18n/i18n-svelte';
	import type { QueryType, MutationTypeQueryTypeArgs } from '~/lib/types/schema';

	export let node: QueryType | null | undefined;
	export let isFetching: boolean = false;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeQueryTypeArgs;
			then: (data: QueryType | null | undefined) => void;
			catch: (error: Error) => void;
		};
	}>();

	let errors: Record<string, Error> = {};

	const save = (): void => {
		if (node) {
			validate('QueryType', node, $locale)
				.then((data) => {
					errors = {};
					if (node) {
						dispatch('mutation', {
							args: node,
							then: (data) => {
								node = data;
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
					errors = validErrors;
				});
		}
	};

	const remove = (): void => {
		if (node) {
			dispatch('mutation', {
				args: { id: node.id, isDeprecated: true },
				then: (data) => {
					notifications.success($LL.message.removeSuccess());
				},
				catch: (error) => {
					console.error(error);
					notifications.error($LL.message.removeFailed());
				}
			});
		}
	};
</script>

{#if !isFetching && node}
	<Form>
		<FormItems title="QueryType">
			<FormItem label="createGroupId">{node.createGroupId}</FormItem>
			<FormItem label="createTime">{node.createTime}</FormItem>
			<FormItem label="createUserId">{node.createUserId}</FormItem>
			<FormItem label="isDeprecated">{node.isDeprecated}</FormItem>
			<FormItem label="orgLevel">{node.orgLevel}</FormItem>
			<FormItem label="orgLevel5">{node.orgLevel5}</FormItem>
			<FormItem label="realmId">{node.realmId}</FormItem>
			<FormItem label="roleDisable2">{node.roleDisable2}</FormItem>
			<FormItem label="updateTime">{node.updateTime}</FormItem>
			<FormItem label="updateUserId">{node.updateUserId}</FormItem>
			<FormItem label="userDetail">{node.userDetail}</FormItem>
			<FormItem label="userDetail6">{node.userDetail6}</FormItem>
			<FormItem label="version">{node.version}</FormItem>
		</FormItems>
		<FormButtons>
			<button
				class="btn"
				on:click={(e) => {
					e.preventDefault();
					goto('../query-type');
				}}
			>
				{$LL.components.graphql.editor.backBtn()}
			</button>
			<button
				class="btn"
				on:click={(e) => {
					e.preventDefault();
					save();
				}}
			>
				{$LL.components.graphql.editor.saveBtn()}
			</button>
			<button
				class="btn btn-outline btn-error"
				on:click={(e) => {
					e.preventDefault();
					messageBoxs.open({
						title: $LL.components.graphql.table.removeModalTitle(),
						buttonName: $LL.components.graphql.table.removeBtn(),
						buttonType: 'error',
						confirm: () => {
							remove();
							return true;
						}
					});
				}}
			>
				{$LL.components.graphql.editor.removeBtn()}
			</button>
		</FormButtons>
	</Form>
{:else}
	<FormLoading />
{/if}
