import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import { roomManager } from './rooms/RoomManager';

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'digital-diwali-multiplayer' });
});

// Real-time Socket Event Router
io.on('connection', (socket: Socket) => {
  // Join Room
  socket.on('room:join', (data: { roomId: string; participantId: string; name: string }) => {
    const { roomId, participantId, name } = data;
    const result = roomManager.joinRoom(roomId, {
      id: participantId,
      socketId: socket.id,
      name: name || 'Festive Friend',
    });

    if (!result.success || !result.room) {
      socket.emit('room:error', {
        code: result.reason || 'UNKNOWN_ERROR',
        message: 'This celebration is full! (Max 5 participants). Start your own celebration.',
        maxCapacity: roomManager.MAX_CAPACITY,
      });
      return;
    }

    // Join Socket.io room channel
    socket.join(roomId);

    // Send full current room state to joining client
    socket.emit('room:joined', {
      room: result.room,
      you: result.participant,
    });

    // Notify other peers in this room
    socket.to(roomId).emit('room:participant-joined', {
      participant: result.participant,
      participants: result.room.participants,
    });
  });

  // Select Cracker
  socket.on('cracker:select', (data: { roomId: string; crackerId: string }) => {
    const success = roomManager.selectCracker(data.roomId, data.crackerId);
    if (success) {
      io.to(data.roomId).emit('cracker:selected', {
        crackerId: data.crackerId,
      });
    }
  });

  // Ignite Cracker
  socket.on(
    'cracker:ignite',
    (data: { roomId: string; crackerId: string; participantId: string; durationMs: number }) => {
      const payload = roomManager.igniteCracker(
        data.roomId,
        data.crackerId,
        data.participantId,
        data.durationMs
      );

      if (payload) {
        // Broadcast synchronized ignition event with server timestamp to all room members
        io.to(data.roomId).emit('cracker:ignited', payload);
      }
    }
  );

  // Complete Cracker
  socket.on('cracker:completed', (data: { roomId: string }) => {
    roomManager.completeCracker(data.roomId);
    io.to(data.roomId).emit('cracker:reset');
  });

  // Disconnect
  socket.on('disconnect', () => {
    const leaveResult = roomManager.leaveRoom(socket.id);
    if (leaveResult) {
      io.to(leaveResult.roomId).emit('room:participant-left', {
        participantId: leaveResult.participantId,
        newHostId: leaveResult.newHostId,
      });
    }
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`[Digital Diwali] Real-Time Multiplayer Server running on port ${PORT}`);
});

