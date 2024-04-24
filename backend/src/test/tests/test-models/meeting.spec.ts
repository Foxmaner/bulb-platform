import { MeetingModel, CompanyModel, UserModel } from "../../../models";

import mongoose, { ObjectId } from 'mongoose';

import { TestDecorators } from "../../utils";
import { Meeting, Member } from 'index';
import Utils from '../../../models/utils';


@TestDecorators.describeModels("Meeting tests")
class MeetingTests {

	/**
	 * Utils
	 */
	static async createCompany(name: string) {
		const companyParams = {
			name: name
		}

		const resp = await CompanyModel.create(companyParams);
		
		const company = await CompanyModel.findOne({ name: "Company 1" });

		expect(resp.statusCode).toBe(201);

		return company;
	}

	static async createUser(name: string, companyID?: ObjectId) {
		const userParams = {
			oAuthID: "123",
			oAuthProvider: "google",
			name: name,
			accesLevel: 1,
			companyID
		}

		const resp = await UserModel.create(userParams);
		
		const user = await UserModel.findOne({ name });

		expect(resp.statusCode).toBe(201);

		return user;
	}

	static async createMeeting(name: string, creator: ObjectId, date: Date) {
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

		const resp = await MeetingModel.create(meetingParams);
		
		const meeting = await MeetingModel.findOne({ name });

		meeting.members.push({
			userID: creator,
            //accessLevel: Utils.memberAccessLevelTypeConverter("owner")
		})

		expect(resp.statusCode).toBe(201);

		return meeting;
	}

	/**
	 * Create Meeting
	 */
	@TestDecorators.test("Create a meeting")
	async createMeeting() {
		// Setup
		const company = await MeetingTests.createCompany("Company 1");
		var user = await MeetingTests.createUser("User 1", company._id);

		const resp = await user.createMeeting({name: "Meeting 1"});

		console.log(resp);

		// Check if the company was created
		const meetings = await MeetingModel.find();

		expect(resp.statusCode).toBe(201);
		expect(meetings.length).toBe(1);
		expect(meetings[0].members[0].userID).toStrictEqual(user._id);
		expect(meetings[0].members[0].role).toStrictEqual(2);
		user = await UserModel.findById(user._id);
		expect(user.accessibleMeetings.length).toBe(1);
		expect(meetings[0].name).toBe("Meeting 1");
	}

	/* DEPRECATED
	@TestDecorators.test("Create a meeting with invalid input")
	async createInvalidMeeting() {
		const params = {
			name: "Meeting 1",
			owner: "",
			date: new Date()
		};
		
		const resp = await MeetingModel.create(params);

		// Check if the company was created
		const meetings = await MeetingModel.find();

		expect(meetings.length).toBe(0);
	}*/

	/**
	 * Delete Meeting
	 */
	@TestDecorators.test("Delete Meeting")
	async deleteMeeting() {
		// Setup
		const company = await MeetingTests.createCompany("Company 1");
		const user = await MeetingTests.createUser("User 1", company._id);
		
		const params = {
			name: "Meeting 1",
			owner: user._id,
			date: new Date()
		};
		
		await MeetingModel.create(params);

		const meeting = await MeetingModel.findOne({ name: "Meeting 1" });

		// Delete Meeting
		await MeetingModel.delete(meeting._id);

		// Check if the company was created
		const meetings = await MeetingModel.find();

		expect(meetings.length).toBe(0);
	}

	@TestDecorators.test("Delete None Existing Meeting")
	async deleteNoneExistingMeeting() {
		// Setup
		const company = await MeetingTests.createCompany("Company 1");
		const user = await MeetingTests.createUser("User 1", company._id);
		
		const params = {
			name: "Meeting 1",
			owner: user._id,
			date: new Date()
		};
		
		await MeetingModel.create(params);

		// Delete Meeting
		const resp = await MeetingModel.delete(new mongoose.Types.ObjectId("123412341234123412341234"));

		// Check no meeting was created
		const meetings = await MeetingModel.find({});

		console.log(resp.body);

		expect(resp.statusCode).toBe(404);
		expect(meetings.length).toBe(1);
	}

	/**
	 * Get meetings a user participates in
	 */
	@TestDecorators.test("Get user's meetings")
	async GetUserMeetings() {
		const user1 = await MeetingTests.createUser("User 1");
		
	}

	/**
	 * Get add section to meeting
	 */
	@TestDecorators.test("Add and remove section to meeting")
	async addSectionToMeeting() {
		const user1 = await MeetingTests.createUser("User 1");
		const resp = await user1.createMeeting({ name: "Meeting 1"});
		
		const meeting = resp.body;

		const addSectionResp = await meeting.addSection()
	
		const meetingWithSection = await MeetingModel.findOne({ name: "Meeting 1" });

		expect(meetingWithSection.mainDocumentSections.length).toBe(1);

		await meetingWithSection.removeSection(meetingWithSection.mainDocumentSections[0]._id);

		const meetingWithoutSection = await MeetingModel.findOne({ name: "Meeting 1" });

		expect(meetingWithoutSection.mainDocumentSections.length).toBe(0);
		expect(meetingWithoutSection.meetingHistory.length).toBe(1);
	}

	/**
	 * The test below adds three sections to a meeting
	 * It checks that their IDs are different as well
	 */
	@TestDecorators.test("+3 sections")
	async addMultipleSectionsToMeeting() {
		const user1 = await MeetingTests.createUser("User 1");
		const resp = await user1.createMeeting({ name: "Meeting 1"});
		
		var meeting = resp.body;

		const addSection1Resp = await meeting.addSection("Section 1")
		meeting = await MeetingModel.findOne({ name: "Meeting 1" });
		const addSection2Resp = await meeting.addSection("Section 2")
		meeting = await MeetingModel.findOne({ name: "Meeting 1" });
		const addSection3Resp = await meeting.addSection("Section 3")
	
		const meetingWithSections = await MeetingModel.findOne({ name: "Meeting 1" });

		expect(meetingWithSections.mainDocumentSections.length).toBe(3);

		expect (meetingWithSections.mainDocumentSections[0]._id).not.toBe(meetingWithSections.mainDocumentSections[1]._id);
		expect (meetingWithSections.mainDocumentSections[1]._id).not.toBe(meetingWithSections.mainDocumentSections[2]._id);
		expect (meetingWithSections.mainDocumentSections[2]._id).not.toBe(meetingWithSections.mainDocumentSections[0]._id);
	}

	/*
	 * 
	 *
	 */
	@TestDecorators.test("Add section to second meeting")
	async addSectionToSecondMeeting() {
		const user1 = await MeetingTests.createUser("User 1");
		const resp1 = await user1.createMeeting({ name: "Meeting 1"});
		var meeting1 = resp1.body;
		const resp2 = await user1.createMeeting({ name: "Meeting 2"});
		var meeting2 = resp2.body;
		const addSection1Resp = await meeting1.addSection("Section in 1")
		meeting1 = await MeetingModel.findOne({ name: "Meeting 1" });
		const addSection2Resp = await meeting2.addSection("Section in 2")
		var meeting2 = await MeetingModel.findOne({ name: "Meeting 2" });

		expect(meeting1.mainDocumentSections.length).toBe(1);
		expect(meeting2.mainDocumentSections.length).toBe(1);
	}

	/**
	 * Get add section to meeting
	 */
	@TestDecorators.test("Add and remove paragraph to meeting")
	async addParagraphToSection() {
		// Setup
		const user1 = await MeetingTests.createUser("User 1");
		const resp = await user1.createMeeting({ name: "Meeting 1"});
		const meeting = resp.body;
		await meeting.addSection();
		const meetingWithSection = await MeetingModel.findOne({ name: "Meeting 1" });
		expect(meetingWithSection.mainDocumentSections.length).toBe(1);

		console.log("Before paragraph add: " + meetingWithSection);

		// Add the paragraph
		await meetingWithSection.addParagraph(meetingWithSection.mainDocumentSections[0]._id);
		const meetingWithParagraph = await MeetingModel.findOne({ name: "Meeting 1" });
		console.log(meetingWithParagraph);
		expect(meetingWithParagraph.mainDocumentSections[0].contains.length).toBe(1);

		// Remove the paragraph
		//console.log("Deleting paragraph " + meetingWithParagraph.mainDocumentSections[0].contains[0]._id + " of section " + meetingWithParagraph.mainDocumentSections[0]._id);
		await meetingWithParagraph.removeParagraph(meetingWithParagraph.mainDocumentSections[0]._id, meetingWithParagraph.mainDocumentSections[0].contains[0]._id);
		const meetingWithoutParagraph = await MeetingModel.findOne({ name: "Meeting 1" });
		//console.log(meetingWithoutParagraph);
		expect(meetingWithoutParagraph.mainDocumentSections[0].contains.length).toBe(0);
		expect(meetingWithoutParagraph.mainDocumentSections[0].sectionHistory.length).toBe(1);
	}
}
