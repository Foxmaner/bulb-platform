import { Paragraph } from "index";
import { MeetingModel } from "../../models";
import diff_match_patch from 'diff-match-patch';
import { ICursor, INote } from "socket";
import { Socket } from "socket.io";

const dmp = new diff_match_patch();

export class BrainstormController {
    static async cursor_move(socket: Socket, data: ICursor){
        const meetingID = await MeetingModel.get(data.meetingID);
        const sectionId = await meetingID.body.meeting.getSection(data.sectionID);
        const paragraphID = await sectionId.getParagraph(data.paragraphID);
        const user = socket.id;
        const out = {
            user: user,
            sectionID: sectionId,
            paragraphID: paragraphID,
            xPos: data.xPos,
            yPos: data.yPos
        };
        socket.broadcast.to(meetingID).emit('cursor_moved',  out);
    } 

    static async notes_move(socket: Socket, data: INote){

        const meetingID = await MeetingModel.get(data.meetingID);
        const sectionId = await meetingID.body.meeting.getSection(data.sectionID);
        const paragraphID = await sectionId.getParagraph(data.paragraphID);
        const out = {
            noteID: data.noteID,
            sectionID: sectionId,
            paragraphID: paragraphID,
            xPos: data.xPos,
            yPos: data.yPos,
        };
        socket.broadcast.to(data.meetingID).emit('notes_moved', out);
    }

    static async create_note(socket: Socket, data){

        const respMeeting = await MeetingModel.get(data.meetingID);
        const meeting = respMeeting.body.meeting;     
        const res = await meeting.addAnswer(data.sectionID, data.paragraphID, data.text);
        const  answer = res.body;
        socket.broadcast.to(data.meetingID).emit('note_created', {answer});
    }

    static async delete_note(socket: Socket, data){

        const respMeeting = await MeetingModel.get(data.meetingID);
        const meeting = respMeeting.body.meeting;     
        const res = await meeting.removeAnswer(data.sectionID, data.paragraphID, data.answerID);
        const  answer = res.body;
        socket.broadcast.to(data.meetingID).emit('note_deleted', {answer});
    }
}