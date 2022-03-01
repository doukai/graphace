<script lang="ts">
	import { operationStore, query } from '@urql/svelte';
	import { TypeManager, __TypeKind, type __Type } from '$lib/TypeManager';
	export let __type: __Type;
	export let id: string;

	const manager: TypeManager = new TypeManager();

	const queryTypeFieldName = manager.getQueryTypeFieldName(__type.name);
	const fields = __type.fields;
	const selections = fields
		.filter(
			(field) =>
				manager.getFieldType(field.type) === __TypeKind.SCALAR ||
				manager.getFieldType(field.type) === __TypeKind.ENUM
		)
		.map((field) => field.name)
		.join(' ');

	const queryType = operationStore(
		`#graphql
		query ($id: ID) {
			${queryTypeFieldName} (id: {val: $id}){
				${selections}
			}
		}`,
		{ id }
	);
	query(queryType);
</script>

<form class="space-y-8 divide-y divide-gray-200">
	<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
		<div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
			<div>
				<h3 class="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
				<p class="mt-1 max-w-2xl text-sm text-gray-500">
					Use a permanent address where you can receive mail.
				</p>
			</div>
			{#if $queryType.fetching}
				loading
			{:else}
				{#each Object.keys(queryType.data[queryTypeFieldName]) as fieldName}
					<div class="space-y-6 sm:space-y-5">
						<div
							class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
						>
							<label
								for="first-name"
								class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								{fieldName}
							</label>
							<div class="mt-1 sm:mt-0 sm:col-span-2">
								<input
									type="text"
									name="first-name"
									id="first-name"
									autocomplete="given-name"
									class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									value={queryType.data[queryTypeFieldName][fieldName]}
								/>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<div class="pt-5">
		<div class="flex justify-end">
			<button
				type="button"
				class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>Cancel</button
			>
			<button
				type="submit"
				class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>Save</button
			>
		</div>
	</div>
</form>
