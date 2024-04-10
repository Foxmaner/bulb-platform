import { getModelForClass } from '@typegoose/typegoose';


export default class BaseController<T> {
    private _model: any;

    constructor(model: new () => T) {
        this._model = getModelForClass(model);
        
    }

    protected get model() {
        return this._model;
    }

}