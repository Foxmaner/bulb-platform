import { Request, Response } from 'express';
import { MeetingModel } from '../../models';



export default class SectionController {

    static async get(req: Request, res: Response) {
        const meetingID = req.params.meetingID;
        const sectionID = req.params.sectionID;
        const meeting = await MeetingModel.findById(meetingID);
        const resp = await meeting.getSection(sectionID);
        return res.status(resp.statusCode).json({section: resp.body});
    }

    static async create(req: Request, res: Response) {
        const meetingId = req.params.meetingId;
        const meeting = await MeetingModel.findById(meetingId);
        const resp = await meeting.addSection();
        return res.status(resp.statusCode).json({section: resp.body});
    }

    static async delete(req: Request, res: Response) {
        const meetingID = req.params.meetingID;
        const sectionID = req.params.sectionID;
        const meeting = await MeetingModel.get(meetingID);
        const resp = await meeting.removeSection(sectionID);
        return res.status(resp.statusCode).json({section: resp.body});
    }

    static edit(req: Request, res: Response){

    }
}