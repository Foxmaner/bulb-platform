import { Server, Socket } from 'socket.io';
import { MeetingModel, UserModel } from './models';
import { isObjectBindingPattern } from 'typescript';
import { Section } from 'index';
import { response } from 'express';

function connectionHandler(socket : Socket) : void {
    console.log(`User connected with ID: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`User with ID : ${socket.id} disconnected`)
    });

    socket.on('join_room', (roomID) => {
        socket.join(roomID);
		console.log(`User ${socket.id} joined room ${roomID}`);
    });

    socket.on('document', async ({meetingId, user}, callback) => {
        //Need to verify that the user exists
        // @ts-ignore
        const meeting = await Document.get(meetingId, response);
        // @ts-ignore
        if (!response.success){
            callback(response)
        }
        
        if (!meeting){
            console.log(`No meeting with ID: ${meetingId}`);
            return;
        }

        const users = meeting.members;
        if (!users.includes(user)){
            callback({err : 'User do not have access to the meeting'})
        }

        callback(meeting);
    });

    socket.on('edit', (roomId, data) => {   
        socket.to(roomId).emit('update', data)
    })

    socket.on("section_create", (meetingId, callback) => {
    });
}

export { connectionHandler };

