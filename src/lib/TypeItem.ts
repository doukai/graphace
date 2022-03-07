import type { __Type } from "./TypeManager";

export class TypeItem {
    public name: string;
    public value: any;
    public __type: __Type;

    public constructor(name: string, value: any, __type: __Type) {
        this.name = name;
        this.value = value;
        this.__type = __type;
    }
}
