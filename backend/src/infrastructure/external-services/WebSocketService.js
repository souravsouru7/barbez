const WebSocket = require('ws');
const debug = require('debug')('salon:chat:websocket');

class WebSocketService {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Map();

    this.wss.on('connection', this.handleConnection.bind(this));
  }

  handleConnection(ws) {
    debug('New WebSocket connection');
    ws.on('message', (message) => this.handleIncomingMessage(ws, message));
    ws.on('close', () => this.handleDisconnection(ws));
    ws.on('error', this.handleError);

    ws.send(JSON.stringify({ type: 'system', content: 'Connected to the chat server' }));
  }

  handleIncomingMessage(ws, message) {
    try {
      debug('Received message:', message);
      const data = JSON.parse(message);

      switch (data.type) {
        case 'identity':
          this.registerClient(data.userId, ws);
          break;
        case 'message':
          this.handleChatMessage(data);
          break;
        default:
          ws.send(JSON.stringify({ type: 'error', content: 'Unknown message type' }));
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  registerClient(userId, ws) {
    debug('Registering client:', userId);
    this.clients.set(userId, ws);
    ws.send(JSON.stringify({ type: 'system', content: 'Identity registered successfully' }));
  }

  handleChatMessage(data) {
    const { senderId, receiverId, content, chatRoomId } = data;
    debug('Handling chat message:', { senderId, receiverId, chatRoomId });
    const message = {
      type: 'message',
      senderId,
      receiverId,
      content,
      chatRoomId,
      timestamp: new Date().toISOString()
    };

    this.sendMessage(receiverId, message);
    this.sendMessage(senderId, { type: 'sent', originalMessage: message });
  }

  handleDisconnection(ws) {
    debug('Client disconnected');
    for (const [userId, client] of this.clients.entries()) {
      if (client === ws) {
        this.clients.delete(userId);
        debug(`Client ${userId} disconnected`);
        break;
      }
    }
  }

  handleError(error) {
    debug('WebSocket error:', error);
  }

  sendMessage(userId, message) {
    debug('Sending message to user:', userId);
    const userWs = this.clients.get(userId);
    if (userWs && userWs.readyState === WebSocket.OPEN) {
      userWs.send(JSON.stringify(message));
      return { success: true };
    } else {
      debug(`Unable to send message to user ${userId}: User not connected`);
      return { success: false, reason: 'User not connected' };
    }
  }

  broadcastMessage(message, excludeUserId = null) {
    debug('Broadcasting message:', message);
    this.clients.forEach((ws, userId) => {
      if (userId !== excludeUserId && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      }
    });
  }

  updateUserStatus(userId, status) {
    debug('Updating user status:', { userId, status });
    const statusUpdate = {
      type: 'statusUpdate',
      userId,
      status
    };
    this.broadcastMessage(statusUpdate);
  }
}

module.exports = WebSocketService;