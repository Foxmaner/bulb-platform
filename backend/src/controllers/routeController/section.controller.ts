import { Request, Response } from 'express';
import { MeetingModel } from '../../models';



export default class SectionController {
    
    //Fungerar ej. addSection krånglar
    static async create(req: Request, res: Response) {
        const meetingId = req.params.meetingId

        const meeting = await MeetingModel.findById(meetingId)

        const resp = await meeting.addSection()

        return res.status(resp.statusCode).json(resp.body)
    }

    static async delete(req: Request, res: Response) {
        const id = req.params.meetingId

        //vet inte vad rätt syntax för att skaffa meetingId i denna call
        const meetingId = req.params.meetingID 

        const meeting = await MeetingModel.get(meetingId)

        const resp = await meeting.removeSection(meetingId)

        return res.status(resp.statusCode).json(resp.body)
    }

    static edit(req: Request, res: Response){

    }
}