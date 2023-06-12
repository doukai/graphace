<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Form, FormLoading, FormItems, FormButtons } from '@graphace/ui/components/form';
	import { StringItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '~/i18n/i18n-svelte';
	import type { CurrentUser, MutationTypeCurrentUserArgs } from '~/lib/types/schema';

	export let node: CurrentUser | null | undefined;
	export let isFetching: boolean = false;
	export let errors: Record<string, Errors> = {};

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeCurrentUserArgs;
			update?: boolean;
			then: (data: CurrentUser | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			dispatch('mutation', {
				args: node,
				update: true,
				then: (data) => {
					node = data;
					notifications.success($LL.message.saveSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.message.saveFailed());
				}
			});
		}
	};

	const remove = (): void => {
		if (node) {
			dispatch('mutation', {
				args: { id: node., isDeprecated: true },
				update: true,
				then: (data) => {
					notifications.success($LL.message.removeSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.message.removeFailed());
				}
			});
		}
	};
</script>

<Form>
	<FormItems title="CurrentUser">
		{#if isFetching}
			<FormLoading rows={6} />
		{:else}
			{#if node}
				<StringItem label="groups" name="groups" bind:value={node.groups} list readonly errors={errors.groups} />
				<StringItem label="lastName" name="lastName" bind:value={node.lastName} readonly errors={errors.lastName} />
				<StringItem label="login" name="login" bind:value={node.login} readonly errors={errors.login} />
				<StringItem label="name" name="name" bind:value={node.name} readonly errors={errors.name} />
				<StringItem label="realmId" name="realmId" bind:value={node.realmId} readonly errors={errors.realmId} />
				<StringItem label="roles" name="roles" bind:value={node.roles} list readonly errors={errors.roles} />
			{/if}
		{/if}
	</FormItems>
	<FormButtons>
		<button
			class="btn"
			on:click={(e) => {
				e.preventDefault();
				dispatch('back');
			}}
		>
			{$LL.components.graphql.editor.backBtn()}
		</button>
		<button
			class="btn"
			disabled={isFetching}
			on:click={(e) => {
				e.preventDefault();
				save();
			}}
		>
			{$LL.components.graphql.editor.saveBtn()}
		</button>
		<button
			class="btn btn-outline btn-error"
			disabled={isFetching}
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
