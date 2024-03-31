"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaMain = void 0;
const mongoose_1 = require("mongoose");
const SchemaMain = new mongoose_1.Schema({});
exports.SchemaMain = SchemaMain;
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
