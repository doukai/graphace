<script lang="ts">
	import { tippy } from '$lib/tippy';
	import { TypeManager } from '$lib/TypeManager';
	import { Operator } from '$lib/types/Operator';
	import { Sort } from '$lib/types/Sort';
	import type { __Field } from '$lib/types/__Field';
	import type { __FieldFilter } from '$lib/types/__FieldFilter';
	import FieldInput from '$lib/components/graphql/introspection/FieldInput.svelte';
	export let value: __FieldFilter;
	export let research: Function;
	let content: HTMLElement;
	let opr: Operator = value.opr;
	let val: string | number | boolean | null = value.val;
	let sort: Sort = value.sort;
	const manager = new TypeManager();
	const fieldTypeName = manager.getFieldTypeName(value.__field.type);

	let filter = (): void => {
		value.opr = opr;
		value.val = val;
		value.sort = sort;
		research();
	};

	let clean = (): void => {
		value.opr = Operator.EQ;
		value.val = null;
		value.sort = null;
		research();
	};
</script>

<th>
	<div class="flex" bind:this={content}>
		{#if fieldTypeName !== 'Boolean'}
			<div class="form-control">
				<div class="input-group">
					<select class="select select-bordered" bind:value={opr}>
						<option value="EQ" selected>Equals</option>
						<option value="NEQ">Not Equals</option>
						<option value="LK">Like</option>
						<option value="NLK">Not Like</option>
						<option value="GT">Greater Than</option>
						<option value="GTE">Greater Equals</option>
						<option value="LT">Less Than</option>
						<option value="LTE">Less Equals</option>
						<option value="NIL">Is Null</option>
						<option value="NNIL">Not Null</option>
						<option value="IN">In</option>
						<option value="NIN">Not In</option>
					</select>
					<FieldInput __field={value.__field} placeholder="Filter.." bind:value={val} />
				</div>
			</div>
		{:else}
			<FieldInput __field={value.__field} placeholder="Filter.." bind:value={val} />
		{/if}
		<select class="select select-bordered ml-1" bind:value={sort}>
			<option value={null} selected>No Sort</option>
			<option value="ASC">Asc</option>
			<option value="DESC">Desc</option>
		</select>
		<button class="btn btn-square btn-primary ml-1" on:click={() => filter()}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
		<button class="btn btn-square btn-primary ml-1" on:click={() => clean()}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
	<a
		class="link group inline-flex"
		href={null}
		use:tippy={{
			content: content,
			interactive: true,
			arrow: true,
			trigger: 'click',
			interactiveBorder: 30,
			theme: 'daisy',
			maxWidth: 'none'
		}}
	>
		{value.__field.name}
		{#if value.val}
			<span class="ml-1 flex-none"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		{/if}
		{#if value.sort && value.sort === Sort.ASC}
			<span class="ml-1 flex-none">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"
					/>
				</svg>
			</span>
		{/if}
		{#if value.sort && value.sort === Sort.DESC}
			<span class="ml-1 flex-none">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"
					/>
				</svg>
			</span>
		{/if}
	</a>
</th>
