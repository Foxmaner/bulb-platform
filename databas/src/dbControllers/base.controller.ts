import { getModelForClass } from '@typegoose/typegoose';


export default class BaseController {
    protected _model: any;

    constructor(model: any) {
        this._model = getModelForClass(model);
    }

    get model() {
        return this._model;
    }
}