import { TypeItem } from "./TypeItem";
import type { __Type } from "./TypeManager";

export class IntrospectionManager {

    public createTypeItem(__type: __Type, data: object): TypeItem[] {
        return __type.fields.map(field => new TypeItem(field.name, data[field.name], field.type));
    }

}