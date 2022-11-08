<script lang="ts">
  import type { __EnumValue } from '@graphace/graphql/types';
  import type { Error } from '@graphace/commons/types';
  import { Select, CheckboxGroup } from '@graphace/ui/components/input';
  export let name: string;
  export let value: any;
  export let __enumValues: __EnumValue[];
  export let className: string = '';
  export let error: Error = null;
</script>

<Select name="{name}" className="{className}" bind:value error="{error}">
  {#each __enumValues as enumValue}
    <option value="{enumValue.name}">{enumValue.name}</option>
  {/each}
</Select>
