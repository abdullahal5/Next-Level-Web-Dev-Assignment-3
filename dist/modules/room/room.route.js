"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const room_validation_1 = require("./room.validation");
const room_controller_1 = require("./room.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const interface_1 = require("../../interface");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(interface_1.User_Role.admin), (0, validateRequest_1.default)(room_validation_1.RoomValidation.createRoomValidationSchema), room_controller_1.RoomController.createRoom);
router.get("/", room_controller_1.RoomController.getAllRoom);
router.get("/:id", room_controller_1.RoomController.getSingleRoom);
router.put("/:id", (0, auth_1.default)(interface_1.User_Role.admin), (0, validateRequest_1.default)(room_validation_1.RoomValidation.updateRoomValidationSchema), room_controller_1.RoomController.updateRoom);
router.delete("/:id", (0, auth_1.default)(interface_1.User_Role.admin), room_controller_1.RoomController.deleteRoom);
exports.RoomRoutes = router;
