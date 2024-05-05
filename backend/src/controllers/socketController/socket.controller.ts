import { Paragraph } from "index";
import { MeetingModel } from "../../models";
import { IParagraph, ISection, IParagraphEdit, ICursor, INote } from "socket";
import { Socket } from "socket.io"; 
import Delta from "quill-delta";

export class SocketController {

    static join_room(socket : Socket, roomID : string) {
        socket.join(roomID);
		console.log(`User ${socket.id} joined room ${roomID}`);
        socket.broadcast.to(roomID).emit('user_joined', socket.id);
    }

    static async create_section(socket : Socket, data, callback){
        console.log(data);
        const respMeeting = await MeetingModel.get(data.meetingID);
        const meeting = respMeeting.body.meeting;

        if (meeting) {
            const res = await meeting.addSection();
            const section = res.body;
            socket.to(data.meetingID).emit('section_created', { section });
            callback({ section });
        } else {
            socket.emit('error', { message: 'Meeting not found' });
        }
    }

    static async delete_section(socket, data){
        const res = await MeetingModel.get(data.meetingID);
        const meeting = res.body.meeting;
        const resp = await meeting.removeSection(data.sectionID);
        socket.broadcast.to(data.meetingID).emit('section_deleted', { resp });
    }

    static async create_paragraph(socket, data, callback){
        const respMeeting = await MeetingModel.get(data.meetingID);
        const meeting = respMeeting.body.meeting;     

        if (meeting) {
            const res = await meeting.addParagraph(data.sectionID);
            const paragraph = res.body;
            socket.broadcast.to(data.meetingID).emit(`paragraph_created`, { paragraph });
            callback({ paragraph });
        } else {
            socket.emit('error', { message: 'Meeting not found' });
        }
    }

    static async delete_paragraph(socket, data: IParagraph, callback){
        const respMeeting = await MeetingModel.get(data.meetingID);
        const meeting = respMeeting.body.meeting;
        const resp = await meeting.removeParagraph(data.sectionID, data.paragraphID);

        console.log("9999", resp)

        if (resp.statusCode === 200) {
            socket.broadcast.to(data.meetingID).emit(`paragraph_${data.sectionID}.${data.paragraphID}_deleted`, { resp });
            callback({ "message": `${data.sectionID}.${data.paragraphID} was removed` });
        } else {
            socket.emit('error', { message: 'Paragraph not found' });
        }
    }

    static async edit_paragraph(socket, data: IParagraphEdit) {
        
        const respMeeting = await MeetingModel.get(data.meetingID);
        const meeting = respMeeting.body.meeting;
        const paragraph = await meeting.getParagraph(data.sectionID, data.paragraphID);
        const delta = new Delta(paragraph.body);
        delta.compose(data.change);
        console.log(delta.ops);
        let text = '';
        delta.ops.forEach(op => {
            if (op.insert) {
                text += op.insert;
            }
        });
        console.log(text);
    

        socket.to(socket.id).emit("document_content", data);
    };

}