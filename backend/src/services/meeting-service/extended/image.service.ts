import mongoose from "mongoose";


import { Meeting } from "index";

import { Response as res } from "../../utils.service";


/**
 * MethodMeetingService class
 * This class contains all the methods that can be used by the MeetingService class
 */
export class MethodImageService extends mongoose.Model<Meeting> {
    async addImage (sectionID: number) {
        // Add image
    }

    async removeImage (sectionID: number, imageID: number) {
        // Remove image
    }
}