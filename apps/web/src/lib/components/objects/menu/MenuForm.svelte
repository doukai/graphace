<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import { Form, FormLoading } from '@graphace/ui/components/form';
	import { StringItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import MenuTypeItem from '~/lib/components/enums/menu-type/MenuTypeItem.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Menu, MutationTypeMenuArgs } from '~/lib/types/schema';

	export let node: Menu | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeMenuArgs;
			update?: boolean;
			then: (data: Menu | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		parentMutation: {
			args: MutationTypeMenuArgs | null;
			update?: boolean;
			then: (data: Menu | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		gotoSelect: {};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			dispatch('mutation', {
				args: node,
				update: true,
				then: (data) => {
					node = data;
					notifications.success($LL.web.message.saveSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.saveFailed());
				}
			});
		}
	};

	const remove = (): void => {
		if (node) {
			dispatch('mutation', {
				args: { id: node.id, isDeprecated: true },
				update: true,
				then: (data) => {
					notifications.success($LL.web.message.removeSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.removeFailed());
				}
			});
		}
	};

	const unbind = (): void => {
		if (node) {
			dispatch('parentMutation', {
				args: null,
				update: true,
				then: (data) => {
					notifications.success($LL.web.message.unbindSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.unbindFailed());
				}
			});
		}
	};
</script>

<Card>
	<Form
		title={$LL.graphql.objects.Menu.name()}
		{showRemoveButton}
		{showUnbindButton}
		{showGotoSelectButton}
		{showBackButton}
		on:save={save}
		on:remove={() =>
			messageBoxs.open({
				title: $LL.web.components.table.removeModalTitle(),
				buttonName: $LL.web.components.table.removeBtn(),
				buttonType: 'error',
				confirm: () => {
					remove();
					return true;
				}
			})}
		on:unbind={() =>
			messageBoxs.open({
				title: $LL.web.components.table.unbindModalTitle(),
				buttonName: $LL.web.components.table.unbindBtn(),
				buttonType: 'error',
				confirm: () => {
					unbind();
					return true;
				},
				button1: {
					name: $LL.web.components.table.removeBtn(),
					className: 'btn-error',
					onClick: () => {
						remove();
						return true;
					}
				}
			})}
		on:gotoSelect
		on:back
	>
		{#if isFetching}
			<FormLoading rows={8} />
		{:else}
			{#if node}
				<StringItem label={$LL.graphql.objects.Menu.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
				<MenuTypeItem label={$LL.graphql.objects.Menu.fields.type.name()} name="type" bind:value={node.type} errors={errors.type} />
				<StringItem label={$LL.graphql.objects.Menu.fields.path.name()} name="path" bind:value={node.path} errors={errors.path} />
				<StringItem label={$LL.graphql.objects.Menu.fields.icon.name()} name="icon" bind:value={node.icon} errors={errors.icon} />
				<ObjectItem name="folder" path={`${node.id}/folder`} label={$LL.graphql.objects.Menu.fields.folder.name()} errors={errors.folder} on:gotoField />
				<StringItem label={$LL.graphql.objects.Menu.fields.description.name()} name="description" bind:value={node.description} errors={errors.description} />
				<ObjectItem name="role" path={`${node.id}/role`} label={$LL.graphql.objects.Menu.fields.role.name()} errors={errors.role} on:gotoField />
				<ObjectItem name="realm" path={`${node.id}/realm`} label={$LL.graphql.objects.Menu.fields.realm.name()} errors={errors.realm} on:gotoField />
			{/if}
		{/if}
	</Form>
</Card>
