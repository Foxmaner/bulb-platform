import { Request, Response } from 'express';

import { CompanyModel } from "../../models";
import { CompanyController } from "../../controllers";

import { MockRequest, MockResponse } from 'node-mocks-http';

import { TestDecorators } from "../utils";


jest.mock('../models/CompanyModel');

class CompanyTests {
	constructor() {
		console.log("Running CompanyTests!");
	}

	async beforeEach() {
		CompanyModel.deleteMany({}).exec();
	}

	@TestDecorators.post("Create a company", "/company/create")
	async createCompany(req: MockRequest<Request>, res: MockResponse<Response>) {
		req.body = {
			name: "Company 1"
		};
		
		CompanyController.create(req, res);

		// Check if the company was created
		const companies = await CompanyModel.find({});
		
		expect(companies.length).toBe(1);
		expect(companies[0].name).toBe("Company 1");
	}

	@TestDecorators.post("Create a company with invalid input", "/company/create")
	async createInvalidCompany(req: MockRequest<Request>, res: MockResponse<Response>) {
		req.body = {
			name: ""
		};
		
		CompanyController.create(req, res);

		// Check if the company was created
		const companies = await CompanyModel.find({});

		expect(companies.length).toBe(0);
	}
	
	@TestDecorators.post("Create a company with same name", "/company/create")
	async createTwoCompanyWithSameName(req: MockRequest<Request>, res: MockResponse<Response>) {
		req.body = {
			name: "Company 1"
		};
		
		CompanyController.create(req, res);

		CompanyController.create(req, res);

		// Check if only one company was created
		const companies = await CompanyModel.find({});

		expect(companies.length).toBe(1);
		expect(companies[0].name).toBe("Company 1");
	}	
}


new CompanyTests();