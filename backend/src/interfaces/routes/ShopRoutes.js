// Import necessary modules
const express = require('express');
const multer = require('multer');
const router = express.Router();

// Importing required classes and services
const ShopRepositoryMongo = require('../../infrastructure/db/ShopRepositoryMongo.js'); 
const CreateShop = require('../../application/use-case/shopkeeper/shop/CreateShop');
const UpdateShop = require('../../application/use-case/shopkeeper/shop/UpdateShop'); // Use Case for updating a shop
const CloudinaryService = require('../../infrastructure/external-services/CloudinaryService'); // Cloudinary Service for image uploads
const GetAllShops = require('../../application/use-case/shopkeeper/shopuser/GetAllShops'); // Use Case for getting all shops
const SearchShopsByAddress = require('../../application/use-case/shopkeeper/shopuser/SearchShopsByAddress'); // Use Case for searching shops by address
const ShopController = require('../controllers/ShopController'); // Shop Controller
const AddServices = require('../../application/use-case/shopkeeper/shop/AddServices.js');
const UpdateService = require('../../application/use-case/shopkeeper/shop/updateServiceUseCase.js');
const DeleteService = require('../../application/use-case/shopkeeper/shop/deleteServiceUseCase');
const AddTimeSlot = require('../../application/use-case/shopkeeper/shop/timeslot/AddTimeSlot.js');
const GetTimeSlots = require('../../application/use-case/shopkeeper/shop/timeslot/GetTimeSlots.js');
const UpdateTimeSlot = require('../../application/use-case/shopkeeper/shop/timeslot/UpdateTimeSlot.js');
const DeleteTimeSlot = require('../../application/use-case/shopkeeper/shop/timeslot/DeleteTimeSlot.js');
const GetShopById = require('../../application/use-case/shopkeeper/shopuser/GetShopById.js');
const upload = multer({ dest: 'uploads/' });
const GetShopBookings = require('../../application/use-case/shopkeeper/shop/getShopBookings');
const shopRepository = new ShopRepositoryMongo(); 
const cloudinaryService = new CloudinaryService(); 
const  ToggleMode= require("../../application/use-case/shopkeeper/shop/workmode/ToggleShopWorkModeUseCase.js")



const getAllShopsUseCase = new GetAllShops(shopRepository); 
const createShopUseCase = new CreateShop(shopRepository, cloudinaryService); 
const updateShopUseCase = new UpdateShop(shopRepository, cloudinaryService);
const searchShopsByAddressUseCase = new SearchShopsByAddress(shopRepository);
const updateServiceUseCase = new UpdateService(shopRepository);
const deleteServiceUseCase = new DeleteService(shopRepository); // Search Shops by Address Use Case
const addServicesUseCase = new AddServices(shopRepository);
const addTimeSlotUseCase = new AddTimeSlot(shopRepository);
const getTimeSlotsUseCase = new GetTimeSlots(shopRepository);
const updateTimeSlotUseCase = new UpdateTimeSlot(shopRepository);
const deleteTimeSlotUseCase = new DeleteTimeSlot(shopRepository);
const getShopByIdUseCase = new GetShopById(shopRepository);
const getShopBookingsUseCase = new GetShopBookings(shopRepository);
const ToggleModeUseCase= new ToggleMode(shopRepository);
const shopController = new ShopController(
  createShopUseCase, 
  updateShopUseCase, 
  cloudinaryService, 
  shopRepository, 
  getAllShopsUseCase,
  searchShopsByAddressUseCase,
  addServicesUseCase,
  updateServiceUseCase,
  deleteServiceUseCase,
  addTimeSlotUseCase,
  getTimeSlotsUseCase, 
  updateTimeSlotUseCase,
  deleteTimeSlotUseCase,
  getShopByIdUseCase,
  getShopBookingsUseCase,
  ToggleModeUseCase
);


router.get('/', (req, res) => shopController.getAllShops(req, res));
router.get('/details/:shopId', (req, res) => shopController.getShopById(req, res));


router.get('/search', (req, res) => shopController.searchShopsByAddress(req, res));

router.post('/services/:id', (req, res) => shopController.addServices(req, res));
router.get('/services/:id', (req, res) => shopController.getServices(req, res));
router.put('/services/:id/:serviceId', (req, res) => shopController.updateService(req, res));
router.delete('/services/:id/:serviceId', (req, res) => shopController.deleteService(req, res));
// Define the route for adding time slots
router.post('/time-slot/:shopId', shopController.addTimeSlot.bind(shopController));
router.get('/time-slot/:shopId', (req, res) => shopController.getTimeSlots(req, res));


router.put('/time-slot/:shopId/:slotId', (req, res) => shopController.updateTimeSlot(req, res));

router.delete('/time-slot/:shopId/:slotId', (req, res) => shopController.deleteTimeSlot(req, res));
router.post(
  '/add',
  upload.fields([{ name: 'shopImage' },{ name: 'licenseImage' }]), 
  (req, res) => shopController.createShop(req, res)
);


router.put(
  '/update/:id',
  upload.fields([{ name: 'shopImage' }, { name: 'licenseImage' }]), 
  (req, res) => shopController.updateShop(req, res)
);
router.get('/:shopId/bookings', (req, res) => shopController.getShopBookings(req, res));
router.get('/:ownerId', (req, res) => shopController.getShopByOwnerId(req, res));

//shop work mode option toggle mode
router.patch('/:id/toggle-work-mode', (req, res) => shopController.toggleWorkMode(req, res));
module.exports = router;
// {"conversationId":"014efdd3-4599-4af6-9061-2bdb1b21c30c","source":"instruct"}