export type SpeciesInfo = {
    readonly "input": SpeciesInfo$input
    readonly "result": SpeciesInfo$result | undefined
};

export type SpeciesInfo$result = {
    readonly species: {
        readonly name: string
        readonly flavor_text: string
        readonly sprites: {
            readonly front: string
        }
    } | null
};

export type SpeciesInfo$input = {
    id: number
};