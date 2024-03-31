"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const mongoose_1 = require("mongoose");
const SchemaMain = new mongoose_1.Schema({
    name: String
});
SchemaMain.pre("save", function (next) {
    next();
});
SchemaMain.methods.logThis = function () {
    console.log("This is a reference to the instance", this);
};
SchemaMain.statics.logModel = function () {
    console.log("This is a reference to the model", this);
};
const ModelMain = (0, mongoose_1.model)("Companies", SchemaMain);
exports.Company = ModelMain;
