import { model, Schema, SchemaDefinition, Model } from 'mongoose';


interface BaseModelProps<U, S> {
    name: string;
    schema: any;

    methods: S;
    staticMethods: U;
}

class BaseModel<T, U extends Function, S extends Function> {
    protected _schema: Schema;
    protected _model: Model<T & Document>;

    constructor({ name, schema, staticMethods, methods }: BaseModelProps<U, S>) {
        
        this._schema = new Schema<T>(schema)

        this._schema.loadClass(methods);
        this._schema.loadClass(staticMethods);

        this._model = model<T & Document>(name, this._schema);
    }

    get model(): any {
        return this._model;
    }

    assignMethodsTo(methods: any): void {
        Object.getOwnPropertyNames(methods)
        .filter(prop => typeof methods[prop] === 'function')
        .forEach(methodName => {
            this._schema.methods[methodName] = methods[methodName];
        });
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