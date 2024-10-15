const debug = require('debug')('salon:chat:controller');

class ChatController {
  constructor(createChatRoomUseCase, sendMessageUseCase, getMessagesUseCase, updateChatRoomStatusUseCase, getActiveChatRoomsForShopUseCase, webSocketService) {
    this.createChatRoomUseCase = createChatRoomUseCase;
    this.sendMessageUseCase = sendMessageUseCase;
    this.getMessagesUseCase = getMessagesUseCase;
    this.updateChatRoomStatusUseCase = updateChatRoomStatusUseCase;
    this.getActiveChatRoomsForShopUseCase = getActiveChatRoomsForShopUseCase;
    this.webSocketService = webSocketService;
  }

  async createChatRoom(req, res) {
    try {
      debug('Creating chat room with data:', req.body);
      const { bookingId, userId, shopId } = req.body;
      
      if (!bookingId || !userId || !shopId) {
        debug('Missing required fields');
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const chatRoom = await this.createChatRoomUseCase.execute(bookingId, userId, shopId);
      
      this.webSocketService.sendMessage(shopId, {
        type: 'newChatRoom',
        chatRoom: chatRoom
      });

      debug('Chat room created:', chatRoom);
      res.status(201).json(chatRoom);
    } catch (error) {
      debug('Error in createChatRoom:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async sendMessage(req, res) {
    try {
      debug('Sending message with data:', req.body);
      const { senderId, receiverId, content, chatRoomId } = req.body;
      
      if (!senderId || !receiverId || !content || !chatRoomId) {
        debug('Missing required fields');
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const message = await this.sendMessageUseCase.execute(senderId, receiverId, content, chatRoomId);
      
      if (!this.webSocketService) {
        debug('WebSocket service not initialized');
        return res.status(500).json({ error: 'WebSocket service not available' });
      }

      this.webSocketService.sendMessage(receiverId, {
        type: 'newMessage',
        message: message
      });

      this.webSocketService.sendMessage(senderId, {
        type: 'messageSent',
        message: message
      });

      debug('Message sent:', message);
      return res.status(201).json(message);
    } catch (error) {
      debug('Error in sendMessage:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  async getMessages(req, res) {
    try {
      debug('Getting messages for chat room:', req.params.roomId);
      const { roomId } = req.params;
      const messages = await this.getMessagesUseCase.execute(roomId);
      debug('Messages retrieved:', messages.length);
      res.status(200).json(messages);
    } catch (error) {
      debug('Error in getMessages:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateChatRoomStatus(req, res) {
    try {
      debug('Updating chat room status:', req.params.roomId, req.body.status);
      const { roomId } = req.params;
      const { status } = req.body;

      if (!status) {
        debug('Missing required field: status');
        return res.status(400).json({ error: 'Missing required field: status' });
      }

      const updatedRoom = await this.updateChatRoomStatusUseCase.execute(roomId, status);
      debug('Chat room status updated:', updatedRoom);
      res.status(200).json(updatedRoom);
    } catch (error) {
      debug('Error in updateChatRoomStatus:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getActiveChatRoomsForShop(req, res) {
    try {
      debug('Getting active chat rooms for shop:', req.params.shopId);
      const { shopId } = req.params;
      const chatRooms = await this.getActiveChatRoomsForShopUseCase.execute(shopId);
      debug('Active chat rooms retrieved:', chatRooms.length);
      res.status(200).json(chatRooms);
    } catch (error) {
      debug('Error in getActiveChatRoomsForShop:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ChatController;