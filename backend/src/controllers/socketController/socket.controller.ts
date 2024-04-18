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

    static async cursor_move(socket: Socket, data: ICursor, meetingID){
        const user = socket.id;
        const out = { user: user, cursorPosition: data };
        socket.broadcast.to(meetingID).emit('cursor_moved',  out);
    } 

    static async notes_move(socket: Socket, data: ICursor){
        const out = {notesPosition: data};
        socket.broadcast.emit('notes_moved', out);
    }

    static async create_section(socket : Socket, data){

        const respMeeting = await MeetingModel.get(data.meetingID);
        
        const meeting = respMeeting.body;
        const section = meeting.addSection();
        console.log(meeting);
        socket.broadcast.to(data.meetingID).emit('section_created', {data:"section created"});
    }

    static async delete_section(socket, data){
        const meeting = await MeetingModel.get(data.meetingID);
        meeting.removeSection();
        socket.emit('section removed', { message: "Section removed" });
    }

    static async create_paragraph(socket, data){
        const meeting = await MeetingModel.get(data.meetingID);
        meeting.addParagaraph(data.sectionId);
        socket.emit('create paragraph', { message: "Paragraph added" });
    }

    static async delete_paragraph(socket, data: IParagraph){
        const meeting = await MeetingModel.get(data.meetingId);
        meeting.removeParagraph(data.sectionId);
        socket.emit('paragraph removed', { message: "Paragraph removed" });
    }

    static async edit_paragraph(socket, data: IParagraphEdit) {

        const meeting = await MeetingModel.get(data.meetingId);
        const paragraph = meeting.getParagraph(data.sectionId, data.parahraphId)

        const patchesObj = dmp.patch_fromText(data.patches);
        const [newText, _] = dmp.patch_apply(patchesObj, paragraph.text);


        paragraph.pushHistory({
            user: socket.id,
            patch: data.patches
        });

        paragraph.text = newText;

        socket.to(socket.id).emit("document_content", data);
    };

}