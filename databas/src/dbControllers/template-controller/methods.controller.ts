import { ObjectId, Schema } from "mongoose";

import { Response } from "express";

import BaseController from "../base.controller";

import { Member, Meeting } from "index";

import { MeetingModel } from "../../models";

export class MethodTemplateController<T> extends BaseController<T> {
}