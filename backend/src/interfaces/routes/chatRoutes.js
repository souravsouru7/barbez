const express = require('express');
const ChatController = require('../controllers/ChatController');
const MongoChatRepository = require('../../infrastructure/db/MongoChatRepository');
const CreateChatRoomUseCase = require('../../application/use-case/chat/CreateChatRoomUseCase');
const SendMessageUseCase = require('../../application/use-case/chat/SendMessageUseCase');
const GetMessagesUseCase = require('../../application/use-case/chat/GetMessagesUseCase');
const UpdateChatRoomStatusUseCase = require('../../application/use-case/chat/UpdateChatRoomStatusUseCase');
const GetActiveChatRoomsForShopUseCase = require('../../application/use-case/chat/GetActiveChatRoomsForShopUseCase');

const createChatRouter = (webSocketService) => {
  const router = express.Router();
  const chatRepository = new MongoChatRepository();

  const chatController = new ChatController(
    new CreateChatRoomUseCase(chatRepository),
    new SendMessageUseCase(chatRepository),
    new GetMessagesUseCase(chatRepository),
    new UpdateChatRoomStatusUseCase(chatRepository),
    new GetActiveChatRoomsForShopUseCase(chatRepository),
    webSocketService
  );

  router.post('/rooms', chatController.createChatRoom.bind(chatController));
  router.post('/messages', chatController.sendMessage.bind(chatController));
  router.get('/rooms/:roomId/messages', chatController.getMessages.bind(chatController));
  router.put('/rooms/:roomId/status', chatController.updateChatRoomStatus.bind(chatController));
  router.get('/shops/:shopId/active-chats', chatController.getActiveChatRoomsForShop.bind(chatController));

  return router;
};

module.exports = createChatRouter;