<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import type {
		GraphQLError,
		GlobalGraphQLErrorMessageFunction,
		GraphQLErrorsFunction
	} from '@graphace/graphql';
	import { Form, FormLoading, messageBoxs, notifications } from '@graphace/ui';
	import { StringItem } from '@graphace/ui-graphql';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { UserInput } from '~/lib/types/schema';

	export let node: UserInput | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showBackButton: boolean = true;

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const buildGraphQLErrors = getContext<GraphQLErrorsFunction>('buildGraphQLErrors');
	const buildGlobalGraphQLErrorMessage = getContext<GlobalGraphQLErrorMessageFunction>(
		'buildGlobalGraphQLErrorMessage'
	);

	const dispatch = createEventDispatcher<{
		mutation: {
			args: UserInput;
			then: (data: UserInput | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			let args = { ...node };
			dispatch('mutation', {
				args: args,
				then: (data) => {
					notifications.success($LL.graphence.message.saveSuccess());
					dispatch('back', {});
				},
				catch: (graphQLErrors) => {
					console.error(graphQLErrors);
					errors = buildGraphQLErrors(graphQLErrors);
					const globalError = buildGlobalGraphQLErrorMessage(graphQLErrors);
					if (globalError) {
						messageBoxs.open({
							title: $LL.graphence.message.saveFailed(),
							content: globalError,
							buttonName: $LL.ui.button.back(),
							buttonType: 'neutral',
							confirm: () => {
								dispatch('back', {});
								return true;
							}
						});
					}
				}
			});
		}
	};
</script>

<Form
	title={node?.name || $LL.graphql.objects.User.name()}
	showRemoveButton={false}
	{showBackButton}
	on:save={(e) => save()}
	on:back
>
	{#if isFetching}
		<FormLoading rows={4} />
	{:else if node}
		<StringItem
			label={$LL.graphql.objects.User.fields.name.name()}
			name="name"
			bind:value={node.name}
			errors={errors.name}
		/>
		<StringItem
			label={$LL.graphql.objects.User.fields.lastName.name()}
			name="lastName"
			bind:value={node.lastName}
			errors={errors.lastName}
		/>
		<StringItem
			label={$LL.graphql.objects.User.fields.email.name()}
			name="email"
			bind:value={node.email}
			errors={errors.email}
		/>

		<StringItem
			label={$LL.graphql.objects.User.fields.phones.name()}
			name="phones"
			bind:value={node.phones}
			list
			errors={errors.phones}
		/>
	{/if}
</Form>
