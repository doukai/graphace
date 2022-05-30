<script lang="ts">
	import type { __EnumValue, Error } from '$lib/types';
	import { CheckboxGroup } from '$lib/components/ui/input';
	export let value: any;
	export let __enumValues: __EnumValue[];
	export let error: Error;
</script>

<CheckboxGroup
	bind:value
	checkboxs={__enumValues.map((enumValue) => {
		return { name: enumValue.name, value: enumValue.name };
	})}
/>
