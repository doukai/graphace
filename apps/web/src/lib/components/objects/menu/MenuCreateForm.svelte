<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import { Form } from '@graphace/ui/components/form';
	import { StringItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import MenuTypeItem from '~/lib/components/enums/menu-type/MenuTypeItem.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Menu, MutationTypeMenuArgs } from '~/lib/types/schema';

	export let node: MutationTypeMenuArgs = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeMenuArgs;
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
				then: (data) => {
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
				args: {},
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
</script>

<Card>
	<Form
		title={$LL.graphql.objects.Menu.name()}
		showRemoveButton={showRemoveButton && node !== undefined && node !== null && Object.keys(node).length > 0}
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
		on:gotoSelect
		on:back
	>
		<StringItem label={$LL.graphql.objects.Menu.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
		<MenuTypeItem label={$LL.graphql.objects.Menu.fields.type.name()} name="type" bind:value={node.type} errors={errors.type} />
		<StringItem label={$LL.graphql.objects.Menu.fields.path.name()} name="path" bind:value={node.path} errors={errors.path} />
		<StringItem label={$LL.graphql.objects.Menu.fields.icon.name()} name="icon" bind:value={node.icon} errors={errors.icon} />
		<ObjectItem name="folder" path="_/folder" label={$LL.graphql.objects.Menu.fields.folder.name()} errors={errors.folder} on:gotoField />
		<StringItem label={$LL.graphql.objects.Menu.fields.description.name()} name="description" bind:value={node.description} errors={errors.description} />
		<ObjectItem name="role" path="_/role" label={$LL.graphql.objects.Menu.fields.role.name()} errors={errors.role} on:gotoField />
		<ObjectItem name="realm" path="_/realm" label={$LL.graphql.objects.Menu.fields.realm.name()} errors={errors.realm} on:gotoField />
	</Form>
</Card>