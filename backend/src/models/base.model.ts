import { model, Schema, Model } from 'mongoose';


interface BaseModelProps<U, S> {
    name: string;
    schema: any;

    methods: S;
    staticMethods: U;
}

/**
 * 
 * Base Model class
 * 
 * This class is used to create a base model that can be extended by other models
 */
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

}

export default BaseModel;
