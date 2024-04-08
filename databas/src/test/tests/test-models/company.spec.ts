import { Response } from 'express';

import { CompanyModel } from "../../../models";

import { MockResponse } from 'node-mocks-http';

import { TestDecorators } from "../../utils";


@TestDecorators.describe("Company tests")
class CompanyTests {

	@TestDecorators.test("Create a company")
	async createCompany(res: MockResponse<Response>) {
		
		const params = {
			name: "Company 1"
		};
		
		await CompanyModel.create(params, res);

		// Check if the company was created
		const companies = await CompanyModel.find();

		expect(companies.length).toBe(1);
		expect(companies[0].name).toBe("Company 1");
	}

	@TestDecorators.test("Create a company with invalid input")
	async createInvalidCompany(res: MockResponse<Response>) {
		const params = {
			name: ""
		};
		
		await CompanyModel.create(params, res);

		// Check if the company was created
		const companies = await CompanyModel.find();

		expect(companies.length).toBe(0);
	}
	
	@TestDecorators.test("Create a company with same name")
	async createTwoCompanyWithSameName(res: MockResponse<Response>) {
		const params = {
			name: "Company 1"
		};
		
		await CompanyModel.create(params, res);
		await CompanyModel.create(params, res);

		// Check if only one company was created
		const companies = await CompanyModel.find();

		expect(companies.length).toBe(1);
		expect(companies[0].name).toBe("Company 1");
	}

	@TestDecorators.test("Delete a company")
	async deleteCompany(res: MockResponse<Response>) {
		const createParams = {
			name: "Company 1"
		};
		
		await CompanyModel.create(createParams, res);
		
		const companiesBefore = await CompanyModel.find();
		
		const id = companiesBefore[0]._id.toString();

		await CompanyModel.delete(id, res);

		// Check if the company was deleted
		const companiesAfter = await CompanyModel.find();
		expect(companiesAfter.length).toBe(0);
	}
}
