import { model, Schema, SchemaDefinition, Model } from 'mongoose';


interface BaseModelProps<U> {
    name: string;
    schema: SchemaDefinition;
    controller: U;
}

class BaseModel<T, U> {
    protected _schema: Schema;
    protected _model: Model<T & Document>;

    constructor({ name, schema, controller }: BaseModelProps<U>) {
        
        this._schema = new Schema<T>(schema)

        this.assignStaticMethodsTo(controller)

        this._model = model<T & Document>(name, this._schema);
    
    }

    get model(): any {
        return this._model;
    }

    assignStaticMethodsTo(methods: any): void {
        Object.getOwnPropertyNames(methods)
        .filter(prop => typeof methods[prop] === 'function')
        .forEach(methodName => {
            this._schema.statics[methodName] = methods[methodName];
        });
    }
}

export default BaseModel;