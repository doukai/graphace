export type BuilderConfig = {
    objects?: ObjectConfig[]
    enums?: EnumConfig[]
    scalars?: ScalarConfig[]
}

export type ObjectConfig = {
    name: string
    ignore?: boolean
    inRoute?: boolean
    inComponent?: boolean
    import?: string[]
    arrayImport?: string[]
    component?: string
    arrayComponent?: string
    fields?: FieldConfig[]
}

export type FieldConfig = {
    name: string
    ignore?: boolean
    inGraphQL?: boolean
    inList?: boolean
    inDetail?: boolean
    import?: string[]
    arrayImport?: string[]
    component?: string
    arrayComponent?: string
}

export type EnumConfig = {
    name: string
    ignore?: boolean
    inComponent?: boolean
    import?: string[]
    arrayImport?: string[]
    component?: string
    arrayComponent?: string
}

export type ScalarConfig = {
    name: string
    ignore?: boolean
    import?: string[]
    arrayImport?: string[]
    component?: string
    arrayComponent?: string
}