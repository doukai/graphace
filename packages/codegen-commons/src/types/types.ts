export type BuilderConfig = {
    objects?: ObjectConfig[]
    enums?: EnumConfig[]
    scalars?: ScalarConfig[]
}

export type ObjectConfig = {
    name: string
    inRoute?: boolean
    inComponent?: boolean
    import?: string[]
    component?: string
    arrayComponent?: string
    fields?: FieldConfig[]
}

export type FieldConfig = {
    name: string
    inGraphQL?: boolean
    inList?: boolean
    inDetail?: boolean
    import?: string[]
    component?: string
    arrayComponent?: string
}

export type EnumConfig = {
    name: string
    inComponent?: boolean
    import?: string[]
    component?: string
    arrayComponent?: string
}

export type ScalarConfig = {
    name: string
    import?: string[]
    component?: string
    arrayComponent?: string
}