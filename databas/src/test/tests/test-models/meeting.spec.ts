import { Response } from 'express';
import httpMocks from "node-mocks-http";

import { MeetingModel, CompanyModel, UserModel } from "../../../models";

import { ObjectId } from 'mongoose';
import { MockResponse } from 'node-mocks-http';

import { TestDecorators } from "../../utils";
import { Meeting, Member } from 'index';
import { MemberAccessLevel } from 'accessLevels';
import Utils from '../../../models/utils';


@TestDecorators.describe("Meeting tests")
class MeetingTests {

	/**
	 * Utils
	 */
	static async createCompany(name: string) {
		const res = httpMocks.createResponse();

		const companyParams = {
			name: name
		}

		await CompanyModel.create(companyParams, res);
		
		const company = await CompanyModel.findOne({ name: "Company 1" });

		expect(res.statusCode).toBe(201);

		return company;
	}

	static async createUser(name: string, companyID?: ObjectId) {
		const res = httpMocks.createResponse();

		const userParams = {
			oAuthID: "123",
			oAuthProvider: "google",
			name: name,
			accesLevel: 1,
			companyID
		}

		await UserModel.create(userParams, res);
		
		const user = await UserModel.findOne({ name });

		expect(res.statusCode).toBe(201);

		return user;
	}

	static async createMeeting(name: string, creator: ObjectId, date: Date) {
		const res = httpMocks.createResponse();

		const meetingParams = {
			name,
			progress: 0,
			completed: false,
			date,
			mainDocumentSections: [],
			summaryDocumentSections: [],
			meetingHistory: [],
			members: []
		}

		await MeetingModel.create(meetingParams, res);
		
		const meeting = await MeetingModel.findOne({ name });

		meeting.members.push({
			userID: creator,
            accessLevel: Utils.memberAccessLevelTypeConverter("owner")
		})

		expect(res.statusCode).toBe(201);

		return meeting;
	}

	/**
	 * Create Meeting
	 */
	@TestDecorators.test("Create a meeting")
	async createMeeting(res: MockResponse<Response>) {
		// Setup
		const company = await MeetingTests.createCompany("Company 1");
		const user = await MeetingTests.createUser("User 1", company._id);

		// Create a meeting
		const owner: Member = {
			userID: user._id,
			expiryDate: undefined as never,
			accessLevel: 3
		}

		const params: Meeting = {
			name: "Meeting 1",
			date: new Date(),
			members: [ owner ]
		};

		await MeetingModel.create(params, res);

		// Check if the company was created
		const meetings = await MeetingModel.find();

		expect(res.statusCode).toBe(201);
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

	/**
	 * Delete Meeting
	 */
	@TestDecorators.test("Delete Meeting")
	async deleteMeeting(res: MockResponse<Response>) {
		// Setup
		const company = await MeetingTests.createCompany("Company 1");
		const user = await MeetingTests.createUser("User 1", company._id);
		
		const params = {
			name: "Meeting 1",
			owner: user._id,
			date: new Date()
		};
		
		await MeetingModel.create(params, res);

		const meeting = await MeetingModel.findOne({ name: "Meeting 1" });

		// Delete Meeting
		await MeetingModel.delete(meeting._id, res);

		// Check if the company was created
		const meetings = await MeetingModel.find();

		expect(meetings.length).toBe(0);
	}

	@TestDecorators.test("Delete None Existing Meeting")
	async deleteNoneExistingMeeting(res: MockResponse<Response>) {
		// Setup
		const company = await MeetingTests.createCompany("Company 1");
		const user = await MeetingTests.createUser("User 1", company._id);
		
		const params = {
			name: "Meeting 1",
			owner: user._id,
			date: new Date()
		};
		
		await MeetingModel.create(params, res);

		// Delete Meeting
		await MeetingModel.delete("123", res);

		// Check no meeting was created
		const meetings = await MeetingModel.find();

		expect(res.statusCode).toBe(404);
		expect(meetings.length).toBe(1);
	}

	/**
	 * Get meetings a user participates in
	 */
	@TestDecorators.test("Get user's meetings")
	async GetUserMeetings(res: MockResponse<Response>) {
		const user1 = await MeetingTests.createUser("User 1");
		
	}
}



