import { Socket } from 'socket.io';
import { SocketController,  } from '../controllers';

function connectionHandler(socket: any): void {
    console.log(`User connected with ID: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`User with ID : ${socket.id} disconnected`);
    });

    socket.on('join_room', (data) => {
        SocketController.join_room(socket, data);
    });

    socket.on('cursor_movement', (data, meetingID) =>{
        SocketController.cursor_move(socket, data, meetingID);
    });

    socket.on('notes_movement', (data) =>{
        SocketController.notes_move(socket,data);
    });

    socket.on("section_create", (data) => {
        SocketController.create_section(socket, data);
    });

    socket.on('section_delete', (data) => {
        SocketController.delete_section(socket, data);
    });

    socket.on('paragraph_create', (data) => {
        SocketController.create_paragraph(socket, data);
    });

    socket.on('paragraph_delete', (data) => {
        SocketController.delete_paragraph(socket, data);
    });

    socket.on('paragraph_edit', (data) => {
        SocketController.edit_paragraph(socket, data);
    });
}

export { connectionHandler };
