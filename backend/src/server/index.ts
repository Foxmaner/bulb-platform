import { Socket } from 'socket.io';

import { SocketController } from '../controllers';


function connectionHandler(socket : Socket) : void {
    console.log(`User connected with ID: ${socket.id}`);
    
    socket.on('disconnect', () => {
        console.log(`User with ID : ${socket.id} disconnected`)
    });

    //socket.on('join_room', SocketController.join_room)

    socket.on("section_create", SocketController.create_section);

    socket.on('section_delete', SocketController.delete_section);

    socket.on('paragraph_create', SocketController.create_paragraph);

    socket.on('paragraph_delete', SocketController.delete_paragraph)

    socket.on('paragraph_edit', SocketController.edit_paragraph);

}

export { connectionHandler };

