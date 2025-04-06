import { createField, Field } from "./Field.js";
import { createDirective, Directive } from "./Directive.js";

export class Operation {
    operationType: 'query' | 'mutation';
    name?: string | undefined;
    fields: Field[] = [];
    directives?: Directive[] | undefined;
    constructor(params: { operationType: 'query' | 'mutation', name?: string | undefined, fields: Field[], directives?: Directive[] | undefined }) {
        this.operationType = params.operationType;
        this.name = params.name;
        this.fields = params.fields;
        this.directives = params.directives;
    }
    public toString = (): string => {
        return `${this.operationType} ${this.name ? this.name + ' ' : ''}${this.directives?.map(directive => ' ' + directive.toString()) || ''} {
        ${this.fields.map(field => field.toString()).join('\r\n')}
    }`;
    }
}

export const createOperation = (params: any): Operation | undefined => {
    if (params) {
        return new Operation({
            operationType: params.operationType,
            name: params.name,
            fields: params.fields?.map((field: any) => createField(field)),
            directives: params.directives?.map((directive: any) => createDirective(directive))
        });
    }
}