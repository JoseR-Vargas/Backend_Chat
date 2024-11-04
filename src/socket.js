import { Server } from 'socket.io';

const initSocket = (httpServer) => {
    const messages = [];
    
    const io = new Server(httpServer);
    console.log('Servicio socket.io activo');

    io.on('connection', client => {
        console.log(`Cliente conectado, id ${client.id} desde ${client.handshake.address}`);

        client.on('new_user_data', data => {
            client.emit('current_messages', messages);
            client.broadcast.emit('new_user', data);
        });

        client.on('new_own_msg', data => {
            messages.push(data);
            io.emit('new_general_msg', data);
        });
        
        client.on('disconnect', reason => {
            console.log(reason);
        });
    });

    return io;
}

export default initSocket;