import { Paragraph } from "index";
import { MeetingModel } from "../../models";
import diff_match_patch from 'diff-match-patch';
import { IParagraph, ISection, IParagraphEdit, ICursor } from "socket";
import { Socket } from "socket.io";

const dmp = new diff_match_patch();

export class SocketController {

    static join_room(socket : Socket, roomID : string) {
        socket.join(roomID);
		console.log(`User ${socket.id} joined room ${roomID}`);
        socket.broadcast.to(roomID).emit('user_joined', socket.id);
    }

    static async create_section(socket : Socket, data){
        const respMeeting = await MeetingModel.get(data.meetingID);
        const meeting = respMeeting.body.meeting;
        const res = await meeting.addSection();
        const section = res.body;
        socket.broadcast.to(data.meetingID).emit('section_created', section);
    }

    static async delete_section(socket, data){
        const res = await MeetingModel.get(data.meetingID);
        const meeting = res.body.meeting;
        const resp = await meeting.removeSection(data.sectionID);
        socket.broadcast.to(data.meetingID).emit('section_deleted', { resp });
    }

    static async create_paragraph(socket, data){
        const respMeeting = await MeetingModel.get(data.meetingID);
        const meeting = respMeeting.body.meeting;     
        const res = await meeting.addParagaraph(data.sectionID);
        const paragraph = res.body;
        socket.broadcast.to(data.meetingID).emit('paragraph_created', paragraph);
    }

    static async delete_paragraph(socket, data: IParagraph){
        const respMeeting = await MeetingModel.get(data.meetingID);
        const meeting = respMeeting.body.meeting;
        const resp = await meeting.removeParagraph(data.sectionID, data.paragraphID);
        socket.broadcast.to(data.meetingID).emit('paragraph_deleted', { resp });
    }

    static async edit_paragraph(socket, data: IParagraphEdit) {
        
        const respMeeting = await MeetingModel.get(data.meetingID);
        const meeting = respMeeting.body.meeting;
        const paragraph = await meeting.getParagraph(data.sectionID, data.parahraphID)
        
        const [newText, _] = dmp.patch_apply(data.patches, paragraph.text);


        paragraph.pushParagraphHistory({
            user: socket.id,
            patch: data.patches
        });

        paragraph.text = newText;

        socket.to(socket.id).emit("document_content", data);
    };

    static async cursor_move(socket: Socket, data: ICursor, meetingID){
        const user = socket.id;
        const out = { user: user, cursorPosition: data };
        socket.broadcast.to(meetingID).emit('cursor_moved',  out);
    } 

    static async notes_move(socket: Socket, data: ICursor){
        const out = {notesPosition: data};
        socket.broadcast.emit('notes_moved', out);
    }

}