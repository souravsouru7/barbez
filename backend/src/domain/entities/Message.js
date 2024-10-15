class Message {
  constructor(id, senderId, receiverId, content, chatRoomId, timestamp = new Date()) {
    this.id = id;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.content = content;
    this.chatRoomId = chatRoomId;
    this.timestamp = timestamp;
  }
}

module.exports = Message;