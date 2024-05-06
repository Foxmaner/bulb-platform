import mongoose, { ObjectId } from "mongoose";


import { UserModel } from "../../models";
import { Meeting } from "index";

import { Response as res } from "../utils.service";


/**
 * MethodMeetingService class
 * This class contains all the methods that can be used by the MeetingService class
 */
export class MethodMeetingService extends mongoose.Model<Meeting> {

    async changeAccessLevel (userID: ObjectId, accessLevel: string) {
        await this.updateOne({ 
            $set: { "members.$[element].role": accessLevel } }, 
            { arrayFilters: [ { "element.userID": userID } ] 
        });
    }

    isMember (userID: ObjectId) {
        if (!this.members.includes(userID)) {
            return res.status(403).json({ message: "User is not a member of this meeting" });
        }

        return res.status(200);
    }

    async removeAllUsers () {
        for (const member of this.members) {
            const resp = await UserModel.get(member.userID);

            if (resp.statusCode !== 200) {
                return res.status(404).json({ message: "User not found" });
            }

            resp.body.user.removeMeeting(this._id);

            if (resp.statusCode !== 200) {
                return res.status(500).json({ message: "Error removing meeting from user" });
            }
        }

        return res.status(200).json({ message: "Meeting removed" });
    }

    async getOwner () {
        const owner = await this.members.find((member: any) => {
            return member.role == 2;
        });

        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        const resp = await UserModel.get(owner.userID);

        if (resp.statusCode !== 200) {
            return res.status(404).json({ message: "Owner not found" });
        }

        return res.status(200).json({ owner: resp.body.user });
    }

    async removeMember (userID: ObjectId) {
        this.updateOne({ $pull: { members: userID } });
    }

    async addMember (userID: ObjectId) {
        this.members.push(userID);

        const resp = await UserModel.get(userID);

        if (resp.statusCode !== 200) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(resp)

        const addMeetingResp = resp.body.user.addMeeting(this._id);

        await this.updateOne({ 
            $push: { members: {
                userID,
                role: "editor"
            } } 
        });

        if (addMeetingResp.statusCode !== 200) {
            return res.status(500).json({ message: "Error adding meeting to user" });
        }

        return res.status(200).json({ message: "User added" });
    }

}
