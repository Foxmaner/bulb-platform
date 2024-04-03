import { Schema, Document, ObjectId, model, Model } from "mongoose";


interface ISchema extends Document {
    _id: ObjectId;
    addMember: () => void;
}

interface IMyModelStaticMethods extends Model<ISchema> {
    findAll(): Promise<ISchema[]>;
    findOneById(id: string): Promise<ISchema | null>;
}

const SchemaMain = new Schema<ISchema>({});
//let SchemaObjectId = Schema.Types.ObjectId;

SchemaMain.pre("save", function (next) {
    next();
});

SchemaMain.methods.addMember = async function() {
    // Adds a member in new ExampleModel() obj...
}

SchemaMain.statics.findMember = async function() {
    // Finds a member
}

const ModelMain = model<ISchema, IMyModelStaticMethods>("Example", SchemaMain);


export { ModelMain as ExampleModel };
