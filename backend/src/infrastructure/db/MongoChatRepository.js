const IChatRepository = require('../../domain/repositories/IChatRepository');
const ChatRoomModel = require("../models/ChatRoom");
const MessageModel = require('../models/Message');
const debug = require('debug')('salon:chat:repository');

class MongoChatRepository extends IChatRepository {
  async createChatRoom(chatRoom) {
    try {
      debug('Creating chat room:', chatRoom);
      const newChatRoom = new ChatRoomModel({
        bookingId: chatRoom.bookingId,
        userId: chatRoom.userId,
        shopId: chatRoom.shopId
      });
      const savedRoom = await newChatRoom.save();
      debug('Chat room created:', savedRoom);
      return savedRoom;
    } catch (error) {
      debug('Error creating chat room:', error);
      throw error;
    }
  }

  async findChatRoom(bookingId, userId, shopId) {
    debug('Finding chat room:', { bookingId, userId, shopId });
    return await ChatRoomModel.findOne({ bookingId, userId, shopId });
  }

  async getChatRoom(id) {
    debug('Getting chat room by id:', id);
    return await ChatRoomModel.findById(id);
  }

  async saveMessage(message) {
    debug('Saving message:', message);
    const newMessage = new MessageModel({
      senderId: message.senderId,
      receiverId: message.receiverId,
      content: message.content,
      chatRoomId: message.chatRoomId
    });
    const savedMessage = await newMessage.save();
    await ChatRoomModel.findByIdAndUpdate(message.chatRoomId, { lastMessageAt: new Date() });
    debug('Message saved:', savedMessage);
    return savedMessage;
  }

  async getMessages(chatRoomId) {
    debug('Getting messages for chat room:', chatRoomId);
    return await MessageModel.find({ chatRoomId }).sort({ timestamp: 1 });
  }

  async updateChatRoomStatus(chatRoomId, status) {
    debug('Updating chat room status:', { chatRoomId, status });
    return await ChatRoomModel.findByIdAndUpdate(chatRoomId, { status }, { new: true });
  }

  async getActiveChatRoomsForShop(shopId) {
    debug('Getting active chat rooms for shop:', shopId);
    return await ChatRoomModel.find({ shopId, status: 'active' }).sort({ lastMessageAt: -1 });
  }
}

module.exports = MongoChatRepository;