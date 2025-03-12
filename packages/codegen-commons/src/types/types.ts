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
    inQuery?: boolean;
    inMutation?: boolean;
    inSubscription?: boolean;
    inGraphQL?: boolean;
    inRoute?: boolean;
    inList?: boolean;
    inDetail?: boolean;
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
    tsTypeName: string;
    fieldTypeIdName: string | undefined;
    originalFieldName: string;
    originalFieldTypeName: string;
    args: InputInfo[] | undefined;
    isScalarType: boolean;
    isEnumType: boolean;
    isLeafType: boolean;
    isObjectType: boolean;
    isNonNullType: boolean;
    isListType: boolean;
    isConnection: boolean;
    isAggregate: boolean;
    isNamed: boolean;
    isFile: boolean;
    isSelect?: boolean;
    inQueryArgs: boolean;
    inMutationArgs: boolean;
    inQuery?: boolean;
    inMutation?: boolean;
    inSubscription?: boolean;
    inGraphQL?: boolean;
    inRoute?: boolean;
    inList?: boolean;
    inDetail?: boolean;
}

export type InputInfo = {
    inputName: string;
    inputType: string;
    defaultValue: unknown;
}