export type BuilderConfig = {
    objects?: ObjectConfig[];
    enums?: EnumConfig[];
    scalars?: ScalarConfig[];
    queryTypeName?: string;
    mutationTypeName?: string;
    subscriptionTypeName?: string;
    includeRelation?: boolean;
    includeRef?: boolean;
}

export type ObjectConfig = {
    name: string;
    ignore?: boolean;
    inRoute?: boolean;
    inComponent?: boolean;
    select?: boolean;
    import?: string[];
    arrayImport?: string[];
    component?: string;
    arrayComponent?: string;
    fields?: FieldConfig[];
    isContainer?: boolean;
}

export type FieldConfig = {
    name: string;
    ignore?: boolean;
    inGraphQL?: boolean;
    inQuery?: boolean;
    inMutation?: boolean;
    inSubscription?: boolean;
    inList?: boolean;
    inDetail?: boolean;
    inRoute?: boolean;
    select?: boolean;
    import?: string[];
    arrayImport?: string[];
    component?: string;
    arrayComponent?: string;
}

export type EnumConfig = {
    name: string;
    ignore?: boolean;
    inComponent?: boolean;
    import?: string[];
    arrayImport?: string[];
    component?: string;
    arrayComponent?: string;
}

export type ScalarConfig = {
    name: string;
    ignore?: boolean;
    import?: string[];
    arrayImport?: string[];
    component?: string;
    arrayComponent?: string;
}

export type FieldInfo = {
    fieldName: string;
    fieldTypeName: string;
    fieldTypeIdName: string;
    isScalarType: boolean;
    isEnumType: boolean;
    isLeafType: boolean;
    isObjectType: boolean;
    isNonNullType: boolean;
    isListType: boolean;
    inQueryArgs: boolean;
    inMutationArgs: boolean;
    inQuery?: boolean;
    inMutation?: boolean;
    inSubscription?: boolean;
    isNamed: boolean;
    select?: boolean;
    component?: string;
    originalFieldName?: string | undefined;
    aggFieldList?: FieldInfo[] | undefined;
    leafFieldList?: FieldInfo[] | undefined;
}