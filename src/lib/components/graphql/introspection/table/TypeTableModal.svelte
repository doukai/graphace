<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		queryTypeConnection,
		mutationField,
		removeType,
		type QueryParams
	} from '$lib/graphql/Type';
	import { TypeManager } from '$lib/TypeManager';
	import type { __Type, __Field, __FieldFilter, Connection } from '$lib/types';
	import { __TypeKind } from '$lib/types';
	import { createFilter } from '$lib/types/__FieldFilter';
	import { Table, TableLoading } from '$lib/components/ui/table';
	import Pagination from '$lib/components/ui/connection/Pagination.svelte';
	import { FieldTh, FieldTd } from './';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilAlt, Trash } from '@steeze-ui/heroicons';
	import { notifications } from '$lib/stores/Notifications';
	import { messageBox } from '$lib/stores/MessageBox';
	import LL from '$i18n/i18n-svelte';
	import ObjectFieldTd from './ObjectFieldTd.svelte';
</script>
