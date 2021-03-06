import * as _ from "lodash";
import type { Connection, PageInfo, __EnumValue, __Field, __Type } from "./types";
import { __TypeKind } from "./types/__TypeKind";

const aggregateSuffix: string[] = ["Count", "Sum", "Avg", "Max", "Min", "Aggregate"];
const metaFieldList: string[] = ["version", "isDeprecated", "__typename"];
const containerTypeSuffix: string[] = ["Edge", "Connection"];
const containerTypeList: string[] = ["PageInfo"];

export class TypeManager {

    public getFieldType(__type: __Type): __Type {
        if (__type.kind === __TypeKind.NON_NULL) {
            return this.getFieldType(__type.ofType);
        } else if (__type.kind === __TypeKind.LIST) {
            return this.getFieldType(__type.ofType);
        } else {
            return __type;
        }
    }

    public getFieldTypeKind(__type: __Type): __TypeKind {
        if (__type.kind === __TypeKind.NON_NULL) {
            return this.getFieldTypeKind(__type.ofType);
        } else if (__type.kind === __TypeKind.LIST) {
            return this.getFieldTypeKind(__type.ofType);
        } else {
            return __type.kind;
        }
    }

    public fieldIsList(__type: __Type): boolean {
        if (__type.kind === __TypeKind.NON_NULL) {
            return this.fieldIsList(__type.ofType);
        } else if (__type.kind === __TypeKind.LIST) {
            return true;
        } else {
            return false;
        }
    }

    public getFieldTypeName(__type: __Type): string {
        if (__type.kind === __TypeKind.NON_NULL) {
            return this.getFieldTypeName(__type.ofType);
        } else if (__type.kind === __TypeKind.LIST) {
            return this.getFieldTypeName(__type.ofType);
        } else {
            return __type.name;
        }
    }

    public fieldIsEnum(__type: __Type): boolean {
        if (this.getFieldTypeKind(__type) === __TypeKind.ENUM) {
            return true;
        } else {
            return false;
        }
    }

    public getFieldTypeEnumValues(__type: __Type): __EnumValue[] {
        if (__type.kind === __TypeKind.NON_NULL) {
            return this.getFieldTypeEnumValues(__type.ofType);
        } else if (__type.kind === __TypeKind.LIST) {
            return this.getFieldTypeEnumValues(__type.ofType);
        } else {
            return __type.enumValues;
        }
    }

    public getFiledList(__type: __Type): __Field[] {
        return __type.fields
            .filter((field) => !aggregateSuffix.some(suffix => field.name.endsWith(suffix)))
            .filter((field) => !metaFieldList.some(metaField => field.name === metaField))
            .filter((field) => !this.isContainerType(field.type));
    }

    public getScalarFiledList(__type: __Type): __Field[] {
        return this.getFiledList(__type)
            .filter((field) => this.getFieldTypeKind(field.type) !== __TypeKind.OBJECT);
    }

    public getSingleTypeFiledList(__type: __Type): __Field[] {
        return this.getScalarFiledList(__type)
            .filter((field) => !this.fieldIsList(field.type));
    }

    public getNameFiled(__type: __Type): __Field {
        return this.getScalarFiledList(__type).find((field) => field.name === "name") ||
            this.getScalarFiledList(__type).find((field) => field.name === this.getIdFieldName(__type));
    }

    public getAllSingleTypeFiledQueryArguments(__type: __Type): string {
        return this.getSingleTypeFiledList(__type)
            .map(field => `${field.name}:{val: $queryValue}`)
            .join(" ")
            .concat(" cond: OR");
    }

    public createTypeObject(__type: __Type): object {
        const typeObject: object = {};
        this.getScalarFiledList(__type).forEach(field => typeObject[field.name] = null);
        return typeObject;
    }

    public getIdFieldName(__type: __Type): string {
        return __type.fields.find(field => this.getFieldTypeName(field.type) === "ID").name;
    }

    public getQueryTypeListFieldName(__type: __Type): string {
        if (__type.name.startsWith("__")) {
            return "__" + _.camelCase(__type.name.replace("__", "")) + "List";
        } else {
            return _.camelCase(__type.name) + "List";
        }
    }

    public getQueryTypeConnectionFieldName(__type: __Type): string {
        if (__type.name.startsWith("__")) {
            return "__" + _.camelCase(__type.name.replace("__", "")) + "Connection";
        } else {
            return _.camelCase(__type.name) + "Connection";
        }
    }

    public getQueryTypeFieldName(__type: __Type): string {
        if (__type.name.startsWith("__")) {
            return "__" + _.camelCase(__type.name.replace("__", ""));
        } else {
            return _.camelCase(__type.name);
        }
    }

    public getMutationTypeFieldName(__type: __Type): string {
        if (__type.name.startsWith("__")) {
            return "__" + _.camelCase(__type.name.replace("__", ""));
        } else {
            return _.camelCase(__type.name);
        }
    }

    public fieldsToMutationVariables(__type: __Type): string {
        return this.getScalarFiledList(__type)
            .filter((field) => !aggregateSuffix.some(suffix => field.name.endsWith(suffix)))
            .map(field => `$${field.name}: ${this.fieldTypeToArgumentType(field.type)}`)
            .join(",");
    }

    public fieldsToMutationArguments(__type: __Type): string {
        return this.getScalarFiledList(__type)
            .filter((field) => !aggregateSuffix.some(suffix => field.name.endsWith(suffix)))
            .map(field => `${field.name}: $${field.name}`)
            .join(",");
    }

    public fieldsToSelections(__type: __Type): string {
        return this.getScalarFiledList(__type)
            .filter((field) => !aggregateSuffix.some(suffix => field.name.endsWith(suffix)))
            .map((field) => field.name)
            .join(' ');
    }

    public fieldTypeToArgumentType(__type: __Type): string {
        if (this.getFieldTypeKind(__type) === __TypeKind.OBJECT) {
            const fieldTypeName = this.getFieldTypeName(__type);
            return __type.name.replace(fieldTypeName, fieldTypeName + 'Input');
        } else {
            return __type.name;
        }
    }

    public getListFromConnection(connection: Connection): Array<object> {
        return connection.edges.map(edge => edge.node);
    }

    public getPageInfoFromConnection(connection: Connection): PageInfo {
        return connection.pageInfo;
    }

    public isContainerType(__type: __Type): boolean {
        return containerTypeSuffix.some(suffix => this.getFieldTypeName(__type).endsWith(suffix)) || containerTypeList.some(containerType => this.getFieldTypeName(__type) === containerType);
    }

    public typeNameToUrl(typeName: string): string {
        if (typeName.startsWith("__")) {
            return "__" + _.kebabCase(typeName.replace("__", ""));
        } else {
            return _.kebabCase(typeName);
        }
    }

    public urlToTypeName(typeName: string): string {
        if (typeName.startsWith("__")) {
            return "__" + _.camelCase(typeName.replace("__", ""));
        } else {
            return _.camelCase(typeName);
        }
    }
}