import { Schema, Document, ObjectId, model, Model } from "mongoose";
import { CompanyController, ICompanyController } from "../controllers";


interface ISchema extends Document {
    _id: ObjectId,
    name: string
}

type IMyModelStatic = Model<ISchema> & ICompanyController;


const SchemaMain = new Schema<ISchema>({
    name: String
})


Object.assign(SchemaMain.statics, CompanyController);


const ModelMain = model<ISchema, IMyModelStatic>("Companies", SchemaMain);


export { ModelMain as CompanyModel };