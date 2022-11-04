<script lang="ts">
	import type { __EnumValue } from '@packages/graphql/types';
	import type { Error } from '@packages/common/types';
	import { CheckboxGroup } from '@packages/components/input';
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
