import type * as Kit from '@sveltejs/kit';
import type { VariableFunction, AfterLoadFunction, BeforeLoadFunction }  from '../../../../../../plugins/houdini-svelte/runtime/types'
import type { PageLoadEvent, PageData as KitPageData } from './$types'


import { SpeciesInfo$result, SpeciesInfo$input } from '../../../../../../artifacts/SpeciesInfo'
	import { SpeciesInfoStore } from '../../../../../../plugins/houdini-svelte/stores/SpeciesInfo'


type PageParams = PageLoadEvent['params']


export type SpeciesInfoVariables = VariableFunction<PageParams, SpeciesInfo$input>










export type PageData = {
		SpeciesInfo: SpeciesInfoStore
}    
