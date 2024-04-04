import { Schema, Document, ObjectId, model } from "mongoose";


interface ISchema extends Document {
    _id: ObjectId,
    accesLevel: Number,
    companyID: ObjectId,
    accessibleMeetings: [ObjectId]
}

const SchemaMain = new Schema<ISchema>({
    accesLevel: Number,
    companyID: Schema.Types.ObjectId,
    accessibleMeetings: [Schema.Types.ObjectId]
})

const ModelMain = model<ISchema>("Users", SchemaMain);

export { ModelMain as UserModel };