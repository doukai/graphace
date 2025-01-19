import { Field } from "./Field";
import { Directive } from "./Directive";

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
        return `${this.operationType} ${this.name + ' ' || ''}${this.directives?.map(directive => ' ' + directive) || ''} {
        ${this.fields.join('\r\n')}
    }`;
    }
}