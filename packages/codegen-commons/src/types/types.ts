export type BuilderConfig = {
    objects: ObjectConfig[]
    enums: EnumConfig[]
    scalars: ScalarConfig[]
}

export type ObjectConfig = {
    name: string
    inMenu?: boolean
    inRoute?: boolean
    import?: string
    component?: string
    fields?: FieldConfig[]
}

export type FieldConfig = {
    name: string
    inGraphQL?: boolean
    inList?: boolean
    inDetail?: boolean
    import?: string
    component?: string
}

export type EnumConfig = {
    name: string
    import?: string
    component?: string
}

export type ScalarConfig = {
    name: string
    import?: string
    component?: string
}