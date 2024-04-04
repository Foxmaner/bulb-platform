import { getModelForClass } from '@typegoose/typegoose';


export default class BaseController<T> {
    protected _model: any;

    constructor(model: new () => T) {
        this._model = getModelForClass(model);
    }

    get model() {
        return this._model;
    }
}