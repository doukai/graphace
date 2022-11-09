import type { SpeciesInfo$input, SpeciesInfo$result, QueryStore, QueryStoreFetchParams} from '$houdini'

export declare class SpeciesInfoStore extends QueryStore<SpeciesInfo$result, SpeciesInfo$input> {
	constructor() {
		// @ts-ignore
		super({})
	}
}

export const GQL_SpeciesInfo: SpeciesInfoStore

export declare const load_SpeciesInfo: (params: QueryStoreFetchParams<SpeciesInfo$result, SpeciesInfo$input>) => Promise<{SpeciesInfo: SpeciesInfoStore}>

export default SpeciesInfoStore
