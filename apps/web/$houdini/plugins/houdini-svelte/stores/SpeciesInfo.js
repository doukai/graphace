import { QueryStore } from '../runtime/stores'
import artifact from '$houdini/artifacts/SpeciesInfo'

// create the query store

export class SpeciesInfoStore extends QueryStore {
	constructor() {
		super({
			artifact,
			storeName: "SpeciesInfoStore",
			variables: true,
		})
	}
}

export async function load_SpeciesInfo(params) {
	const store = new SpeciesInfoStore()

	await store.fetch(params)

	return {
		SpeciesInfo: store,
	}
}

export const GQL_SpeciesInfo = new SpeciesInfoStore()

export default GQL_SpeciesInfo
