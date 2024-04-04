import { Response } from 'express';

import { MeetingModel } from "../../../models";

import { MockResponse } from 'node-mocks-http';

import { TestDecorators } from "../../utils";


@TestDecorators.describe("Meeting tests")
class MeetingTests {

	@TestDecorators.test("Create a meeting")
	async createMeeting(res: MockResponse<Response>) {
		
		const params = {
			name: "Company 1"
		};
		
		await MeetingModel.create(params, res);

		// Check if the company was created
		const companies = await MeetingModel.find();

		expect(companies.length).toBe(1);
		expect(companies[0].name).toBe("Company 1");
	}

	@TestDecorators.test("Create a meeting with invalid input")
	async createInvalidMeeting(res: MockResponse<Response>) {
		const params = {
			name: ""
		};
		
		await MeetingModel.create(params, res);

		// Check if the company was created
		const companies = await MeetingModel.find();

		expect(companies.length).toBe(0);
	}
	
	@TestDecorators.test("Create a meeting with same name")
	async createTwoCompanyWithSameName(res: MockResponse<Response>) {
		const params = {
			name: "Meeting 1"
		};
		
		await MeetingModel.create(params, res);
		await MeetingModel.create(params, res);

		// Check if only one company was created
		const companies = await MeetingModel.find();

		expect(companies.length).toBe(1);
		expect(companies[0].name).toBe("Company 1");
	}

	@TestDecorators.test("Delete a company")
	async deleteCompany(res: MockResponse<Response>) {
		const createParams = {
			name: "Company 1"
		};
		
		await MeetingModel.create(createParams, res);
		
		const companiesBefore = await MeetingModel.find();
		
		const id = companiesBefore[0]._id.toString();

		await MeetingModel.delete(id, res);

		// Check if the company was deleted
		const companiesAfter = await MeetingModel.find();
		expect(companiesAfter.length).toBe(0);
	}
}



