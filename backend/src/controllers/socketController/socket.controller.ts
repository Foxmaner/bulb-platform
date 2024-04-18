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

    static async cursor_move(socket: Socket, data: ICursor){
        const user = socket.id;
        const out = { user: user, cursorPosition: data };
        socket.broadcast.emit('cursor_moved',  out);
    } 

    static async notes_move(socket: Socket, data: ICursor){
        const out = {notesPosition: data};
        socket.broadcast.emit('notes_moved', out);
    }

    static async create_section(socket : Socket, data: ISection){
        console.log(`${socket.id} created section in meeting ${data}`)
        const meeting = await MeetingModel.get(data.meetingId);
        const section = meeting.addSection();
        //@ts-ignore
        socket.broadcast.to()('new section', section._body.id);
    }

    static async delete_section(socket, data: ISection){
        const meeting = await MeetingModel.get(data.meetingId);
        meeting.removeSection();
        socket.emit('section removed', { message: "Section removed" });
    }

    static async create_paragraph(socket, data: IParagraph){
        const meeting = await MeetingModel.get(data.meetingId);
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