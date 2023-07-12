<script lang="ts">
	import type { Errors } from '@graphace/commons/types';
	import { EnumItem } from '@graphace/ui-graphql/components/form';
	import { Protocol } from '~/lib/types/schema';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';

	let enums = [
		{ name: Protocol.LOCAL, value: Protocol.LOCAL },
		{ name: Protocol.GRPC, value: Protocol.GRPC },
		{ name: Protocol.HTTP, value: Protocol.HTTP },
		{ name: Protocol.RSOCKET, value: Protocol.RSOCKET }
	];
</script>

<EnumItem bind:value {list} {enums} {name} {label} {errors} {readonly} {disabled} {placeholder} />
