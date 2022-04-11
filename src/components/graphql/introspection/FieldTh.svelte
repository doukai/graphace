<script lang="ts">
	import { tippy } from '$lib/tippy';
	import type { __Field } from '$lib/types/__Field';
	export let __field: __Field;
	let content: HTMLElement;
</script>

<th>
	<div class="flex" bind:this={content}>
		<div class="input-group">
			<select class="select select-bordered">
				<option value="EQ" selected>Equals</option>
				<option value="NEQ">Not Equals</option>
				<option value="LK">Like</option>
				<option value="NLK">Not Like</option>
				<option value="GT">Greater Than</option>
				<option value="GTE">Greater Equals</option>
				<option value="LT">Less Than</option>
				<option value="LTE">Less Equals</option>
				<option value="NIL">Is Null</option>
				<option value="NNIL">Is Not Null</option>
				<option value="IN">In</option>
				<option value="NIN">Not In</option>
			</select>
			<input type="text" placeholder="Filter…" class="input input-bordered" />
			<select class="select select-bordered">
				<option value={null} selected>No Sort</option>
				<option value="ASC">Asc</option>
				<option value="DESC">Desc</option>
			</select>
		</div>
		<button class="btn btn-square btn-primary ml-1">
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
		<button class="btn btn-square btn-primary ml-1">
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
		class="link"
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
		{__field.name}
	</a>
</th>
