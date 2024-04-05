import { Response } from 'express';

import { MeetingModel, CompanyModel, UserModel } from "../../../models";

import { ObjectId } from 'mongoose';
import { MockResponse } from 'node-mocks-http';

import { TestDecorators } from "../../utils";
import { Meeting, Member } from 'index';


@TestDecorators.describe("Meeting tests")
class MeetingTests {

	static async createCompany(name: string, res: MockResponse<Response>) {
		const companyParams = {
			name: name
		}

		await CompanyModel.create(companyParams, res);
		
		const company = await CompanyModel.findOne({ name: "Company 1" });

		return company;
	}

	static async createUser(name: string, companyID: ObjectId, res: MockResponse<Response>) {
		const userParams = {
			oAuthID: "123",
			oAuthProvider: "google",
			name: name,
			accesLevel: 1,
			companyID
		}

		await UserModel.create(userParams, res);
		
		const user = await UserModel.findOne({ name: "User 1" });

		return user;
	}

	@TestDecorators.test("Create a meeting")
	async createMeeting(res: MockResponse<Response>) {
		// Setup
		const company = await MeetingTests.createCompany("Company 1", res);
		const user = await MeetingTests.createUser("User 1", company._id, res);

		// Create a meeting
		const owner: Member = {
			userID: user._id,
			expiryDate: undefined as never,
			accessLevel: "owner"
		}

		const params: Meeting = {
			name: "Meeting 1",
			owner: owner.userID,
			date: new Date(),
			members: [ owner ]
		};

		await MeetingModel.create(params, res);

		// Check if the company was created
		const meetings = await MeetingModel.find();

		expect(meetings.length).toBe(1);
		expect(meetings[0].owner).toStrictEqual(user._id);
		expect(meetings[0].name).toBe("Meeting 1");
	}

	@TestDecorators.test("Create a meeting with invalid input")
	async createInvalidMeeting(res: MockResponse<Response>) {
		const params = {
			name: "Meeting 1",
			owner: "",
			date: new Date()
		};
		
		await MeetingModel.create(params, res);

		// Check if the company was created
		const meetings = await MeetingModel.find();

		expect(meetings.length).toBe(0);
	}
}



