import { Schema, Document, ObjectId } from "mongoose";

interface IExample extends Document {
    _id: ObjectId
}

const SchemaMain = new Schema<IExample>({});
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

export { SchemaMain };
