export default {
    name: "SpeciesInfo",
    kind: "HoudiniQuery",
    hash: "28f759b11161961bcee52ec46c124407e55ca0e2c81da424eb1a4a54fb48eff7",

    raw: `query SpeciesInfo($id: Int!) {
  species(id: $id) {
    name
    flavor_text
    sprites {
      front
    }
    id
  }
}
`,

    rootType: "Query",

    selection: {
        species: {
            type: "Species",
            keyRaw: "species(id: $id)",
            nullable: true,

            fields: {
                name: {
                    type: "String",
                    keyRaw: "name"
                },

                flavor_text: {
                    type: "String",
                    keyRaw: "flavor_text"
                },

                sprites: {
                    type: "SpeciesSprites",
                    keyRaw: "sprites",

                    fields: {
                        front: {
                            type: "String",
                            keyRaw: "front"
                        }
                    }
                },

                id: {
                    type: "Int",
                    keyRaw: "id"
                }
            }
        }
    },

    input: {
        fields: {
            id: "Int"
        },

        types: {}
    },

    policy: "CacheOrNetwork",
    partial: false
};

"HoudiniHash=013ef2e95929d6a623258e6c7b74623b676968e35f2daac0f1424a2e140b4caf";