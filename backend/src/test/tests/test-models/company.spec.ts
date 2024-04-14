import { CompanyModel } from "../../../models";

import { TestDecorators } from "../../utils";


@TestDecorators.describeModels("Company tests")
class CompanyTests {

	@TestDecorators.test("Create a company")
	async createCompany() {
		
		const params = {
			name: "Company 1"
		};
		
		await CompanyModel.create(params);

		// Check if the company was created
		const companies = await CompanyModel.find();

		expect(companies.length).toBe(1);
		expect(companies[0].name).toBe("Company 1");

	}

	@TestDecorators.test("Create a company with invalid input")
	async createInvalidCompany() {
		const params = {
			name: ""
		};
		
		await CompanyModel.create(params);

		// Check if the company was created
		const companies = await CompanyModel.find();

		expect(companies.length).toBe(0);
	}
	
	@TestDecorators.test("Create a company with same name")
	async createTwoCompanyWithSameName() {
		const params = {
			name: "Company 1"
		};
		
		await CompanyModel.create(params);
		await CompanyModel.create(params);

		// Check if only one company was created
		const companies = await CompanyModel.find();

		expect(companies.length).toBe(1);
		expect(companies[0].name).toBe("Company 1");
	}

	@TestDecorators.test("Delete a company")
	async deleteCompany() {
		const createParams = {
			name: "Company 1"
		};
		
		await CompanyModel.create(createParams);
		
		const companiesBefore = await CompanyModel.find();
		
		const id = companiesBefore[0]._id.toString();

		await CompanyModel.delete(id);

		// Check if the company was deleted
		const companiesAfter = await CompanyModel.find();
		expect(companiesAfter.length).toBe(0);
	}
}
