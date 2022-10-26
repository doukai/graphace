<script lang="ts">
	import type { __EnumValue, Error } from '@packages/graphql';
	import { CheckboxGroup } from '@packages/components';
	export let value: any;
	export let __enumValues: __EnumValue[];
	export let error: Error = null;
</script>

<CheckboxGroup
	bind:value
	checkboxs={__enumValues.map((enumValue) => {
		return { name: enumValue.name, value: enumValue.name };
	})}
	{error}
/>
