import { Schema, Document, ObjectId, model } from "mongoose";


interface ISchema extends Document {
    _id: ObjectId
}

const SchemaMain = new Schema<ISchema>({});
//let SchemaObjectId = Schema.Types.ObjectId;

SchemaMain.pre("save", function (next) {
    next();
});

SchemaMain.methods.logThis = function () {
    console.log("This is a reference to the instance", this);
};

SchemaMain.statics.logModel = function () {
    console.log("This is a reference to the model", this);
};

const ModelMain = model<ISchema>("Users", SchemaMain);

export { ModelMain as ExampleModel };
