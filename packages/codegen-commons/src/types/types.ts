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
    table?: boolean;
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
    table?: boolean;
}

export type EnumConfig = {
    name: string;
    ignore?: boolean;
    inComponent?: boolean;
}

export type ScalarConfig = {
    name: string;
    ignore?: boolean;
}

export type ObjectInfo = {
    name: string;
    idName: string | undefined;
    fields: FieldInfo[];
    hasFileField: boolean;
    isConnection: boolean;
    isNamed: boolean;
    aggFields?: FieldInfo[] | undefined;
}

export type ImportInfo = {
    scalars: string[];
    baseScalars: string[];
    enums: string[];
    objects: string[];
    selects: string[];
    tables: string[];
    nonSelects: string[];
}

export type FieldInfo = {
    fieldName: string;
    fieldTypeName: string;
    tsTypeName: string;
    fieldTypeIdName: string | undefined;
    originalFieldName: string;
    originalFieldTypeName: string;
    pairFieldName?: string | undefined;
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
    isSelect: boolean;
    isTable: boolean;
    inQueryArgs: boolean;
    inMutationArgs: boolean;
    inQuery: boolean;
    inMutation: boolean;
    inSubscription: boolean;
    inGraphQL: boolean;
    inRoute: boolean;
    inList: boolean;
    inDetail: boolean;
    fields?: FieldInfo[] | undefined;
    aggFields?: FieldInfo[] | undefined;
}

export type InputInfo = {
    inputName: string;
    inputType: string;
    defaultValue: unknown;
}