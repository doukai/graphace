<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Form, FormLoading, FormItems, FormButtons } from '@graphace/ui/components/form';
	import { StringItem, TimestampItem, IDItem, IntItem, BooleanItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import LL from '~/i18n/i18n-svelte';
	import { locale } from '~/i18n/i18n-svelte';
	import type { UserPhones, MutationTypeUserPhonesArgs } from '~/gql/generated/schema';

	export let node: MutationTypeUserPhonesArgs | null | undefined;
	export let isFetching: boolean = false;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeUserPhonesArgs;
			then: (data: UserPhones | null | undefined) => void;
			catch: (error: Error) => void;
		};
	}>();

	let errors: Record<string, Error> = {};

	const save = (): void => {
		if (node) {
			validate('UserPhones', node, $locale)
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
		<FormItems title="UserPhones">
			<StringItem label="createGroupId" name="createGroupId" bind:value={node.createGroupId} error={errors.createGroupId} />
			<TimestampItem label="createTime" name="createTime" bind:value={node.createTime} error={errors.createTime} />
			<StringItem label="createUserId" name="createUserId" bind:value={node.createUserId} error={errors.createUserId} />
			<IDItem label="id" name="id" bind:value={node.id} error={errors.id} />
			<BooleanItem label="isDeprecated" name="isDeprecated" bind:value={node.isDeprecated} error={errors.isDeprecated} />
			<StringItem label="phone" name="phone" bind:value={node.phone} error={errors.phone} />
			<StringItem label="realmId" name="realmId" bind:value={node.realmId} error={errors.realmId} />
			<TimestampItem label="updateTime" name="updateTime" bind:value={node.updateTime} error={errors.updateTime} />
			<StringItem label="updateUserId" name="updateUserId" bind:value={node.updateUserId} error={errors.updateUserId} />
			<IntItem label="userId" name="userId" bind:value={node.userId} error={errors.userId} />
			<IntItem label="version" name="version" bind:value={node.version} error={errors.version} />
		</FormItems>
		<FormButtons>
			<button
				class="btn"
				on:click={(e) => {
					e.preventDefault();
					goto('../user-phones');
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
