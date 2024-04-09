import { Response } from 'express';
import httpMocks from "node-mocks-http";

import { UserModel } from "../../../models";

import { ObjectId } from 'mongoose';
import { MockResponse } from 'node-mocks-http';

import { TestDecorators } from "../../utils";

import Utils from '../../../models/utils';


@TestDecorators.describeModels("User tests")
class UserTests {
    
}