const IChatRepository = require('../../domain/repositories/IChatRepository');
const ChatRoomModel = require('../../models/ChatRoom');


class MongoChatRepository extends IChatRepository {
  async createChatRoom(chatRoom) {
    try {
      const newChatRoom = new ChatRoomModel({
        bookingId: chatRoom.bookingId,
        userId: chatRoom.userId,
        shopId: chatRoom.shopId
      });
      return await newChatRoom.save();
    } catch (error) {
      console.error('Error creating chat room:', error);
      throw error;
    }
  }

  async getChatRoom(id) {
    return await ChatRoomModel.findById(id);
  }

  async saveMessage(message) {
    const newMessage = new MessageModel({
      senderId: message.senderId,
      receiverId: message.receiverId,
      content: message.content,
      chatRoomId: message.chatRoomId
    });
    return await newMessage.save();
  }

  async getMessages(chatRoomId) {
    return await MessageModel.find({ chatRoomId }).sort({ timestamp: 1 });
  }
}

module.exports = MongoChatRepository;