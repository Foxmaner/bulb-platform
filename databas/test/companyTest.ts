import mongoose from "mongoose";
import { Company } from "../models/company";

import { configureDatabaseConnection } from "./utils";


class CompanyTest {
    //@configureDatabaseConnection
    static async create() {

        console.log("Connection done, creating company")

        const eastSwedenMedtech = new Company({name: "East Sweden Medtech"})
        console.log(eastSwedenMedtech.name);

        await eastSwedenMedtech.save();

        console.log("Upload complete")
    }
}

CompanyTest.create();