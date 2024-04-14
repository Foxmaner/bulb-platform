import { Socket } from 'socket.io';

import { SocketController } from '../controllers';


function connectionHandler(socket : Socket) : void {
    console.log(`User connected with ID: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`User with ID : ${socket.id} disconnected`)
    });

    socket.on('join_room', SocketController.join_room)

    socket.on("section_create", SocketController.create_section);
}

export { connectionHandler };

