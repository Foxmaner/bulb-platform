import { Company } from "../../models/company";
import { testDecorator } from "../utils";


class CompanyTests {
	constructor() {
		console.log("Running CompanyTests!");
	}

	async beforeEach() {
		Company.deleteMany({}).exec();
	}

	async afterEach() {
		Company.deleteMany({}).exec();
	}

	@testDecorator("Create a company")
	async createCompany() {
		const company = new Company({
			name: "Company 1"
		});

		await company.save();

		const companies = await Company.find({});

		// Check if the company was created
		expect(companies.length).toBe(1);
		expect(companies[0].name).toBe("Company 1");
	}
}


new CompanyTests();