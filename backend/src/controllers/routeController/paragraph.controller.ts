import { Request, Response } from 'express';
import { MeetingModel } from '../../models';



export default class ParagraphController {

    static async delete(req: Request, res: Response) {
        const meetingID = req.params.meetingID;
        const sectionID = req.params.sectionID;
        const paragraphID = req.params.paragraphID;
        const meeting = await MeetingModel.findById(meetingID);
        const resp = await meeting.removeParagraph(sectionID, paragraphID);
        return res.status(resp.statusCode).json(resp.body);
    }

    static async create(req: Request, res: Response) {
        const meetingID = req.params.meetingID;
        const sectionID = req.params.meetingID;
        const meeting = await MeetingModel.findById(meetingID);
        const resp = await meeting.addParagraph(sectionID);
        return res.status(resp.statusCode).json(resp.body);
    }

    static edit(req: Request, res: Response){

    }
}