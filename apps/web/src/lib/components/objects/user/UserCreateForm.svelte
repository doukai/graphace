<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Form, FormItems, FormButtons } from '@graphace/ui/components/form';
	import { IntItem, StringItem, TimestampItem, BooleanItem, IDItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import SexItem from '~/lib/components/enums/sex/SexItem.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import LL from '~/i18n/i18n-svelte';
	import { locale } from '~/i18n/i18n-svelte';
	import type { User, MutationTypeUserArgs } from '~/lib/types/schema';

	export let node: MutationTypeUserArgs = {};

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeUserArgs;
			then: (data: User | null | undefined) => void;
			catch: (error: Error) => void;
		};
		back: {};
	}>();

	let errors: Record<string, Error> = {};

	const save = (): void => {
		if (node) {
			validate('User', node, $locale)
				.then((data) => {
					errors = {};
					if (node) {
						dispatch('mutation', {
							args: node,
							then: (data) => {
								notifications.success($LL.message.saveSuccess());
								dispatch('back');
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
					dispatch('back');
				},
				catch: (error) => {
					console.error(error);
					notifications.error($LL.message.removeFailed());
				}
			});
		}
	};
</script>

<Form>
	<FormItems title="User">
		<IntItem label="age" name="age" bind:value={node.age} error={errors.age} />
		<StringItem label="createGroupId" name="createGroupId" bind:value={node.createGroupId} error={errors.createGroupId} />
		<TimestampItem label="createTime" name="createTime" bind:value={node.createTime} error={errors.createTime} />
		<StringItem label="createUserId" name="createUserId" bind:value={node.createUserId} error={errors.createUserId} />
		<BooleanItem label="disable" name="disable" bind:value={node.disable} error={errors.disable} />
		<IDItem label="id" name="id" bind:value={node.id} error={errors.id} />
		<BooleanItem label="isDeprecated" name="isDeprecated" bind:value={node.isDeprecated} error={errors.isDeprecated} />
		<StringItem label="login" name="login" bind:value={node.login} error={errors.login} />
		<StringItem label="name" name="name" bind:value={node.name} error={errors.name} />
		<ObjectItem name="organization" path="_/organization" label="organization" error={errors.organization} on:gotoField />
		<IntItem label="organizationId" name="organizationId" bind:value={node.organizationId} error={errors.organizationId} />
		<StringItem label="password" name="password" bind:value={node.password} error={errors.password} />
		<StringItem label="phones" name="phones" bind:value={node.phones} error={errors.phones} />
		<StringItem label="realmId" name="realmId" bind:value={node.realmId} error={errors.realmId} />
		<ObjectItem name="roles" path="_/roles" label="roles" error={errors.roles} on:gotoField />
		<ObjectItem name="rolesConnection" path="_/roles-connection" label="rolesConnection" error={errors.rolesConnection} on:gotoField />
		<SexItem label="sex" name="sex" bind:value={node.sex} error={errors.sex} />
		<IntItem label="test1" name="test1" bind:value={node.test1} error={errors.test1} />
		<BooleanItem label="test2" name="test2" bind:value={node.test2} error={errors.test2} />
		<TimestampItem label="updateTime" name="updateTime" bind:value={node.updateTime} error={errors.updateTime} />
		<StringItem label="updateUserId" name="updateUserId" bind:value={node.updateUserId} error={errors.updateUserId} />
		<ObjectItem name="userProfile" path="_/user-profile" label="userProfile" error={errors.userProfile} on:gotoField />
		<IntItem label="version" name="version" bind:value={node.version} error={errors.version} />
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