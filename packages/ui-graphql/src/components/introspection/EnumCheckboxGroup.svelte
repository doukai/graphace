<script lang="ts">
	import type { __EnumValue } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { CheckboxGroup } from '@graphace/ui/components/input';
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
