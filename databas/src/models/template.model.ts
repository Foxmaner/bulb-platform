import { Schema, Document, ObjectId, model } from "mongoose";

import { Section } from "index";


interface ISchema extends Document {
    _id: ObjectId,
    userID: ObjectId,
    name: string,
    sections: [Section],
    companyAccess: ObjectId | null;
}

const SchemaMain = new Schema<ISchema>({
    userID: Schema.Types.ObjectId,
    name: String,
    sections: [],
    companyAccess: Schema.Types.ObjectId
});

const ModelMain = model<ISchema>("Templates", SchemaMain);

export { ModelMain as TemplateModel };