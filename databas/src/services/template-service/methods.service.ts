import { ObjectId, Schema } from "mongoose";

import { Response } from "express";

import BaseService from "../base.service";

import { Member, Meeting } from "index";

import { MeetingModel } from "../../models";

export class MethodTemplateService<T> extends BaseService<T> {
}