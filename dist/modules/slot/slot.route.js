"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const interface_1 = require("../../interface");
const slot_controller_1 = require("./slot.controller");
const slot_validation_1 = require("./slot.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(interface_1.User_Role.admin), (0, validateRequest_1.default)(slot_validation_1.SlotValidation.createSlotValidation), slot_controller_1.SlotController.createSlot);
router.get("/:id", slot_controller_1.SlotController.getSingleSlot);
router.get("/", slot_controller_1.SlotController.getAllSlot);
router.put("/:id", (0, auth_1.default)(interface_1.User_Role.admin), slot_controller_1.SlotController.updateSlot);
router.delete("/:id", (0, auth_1.default)(interface_1.User_Role.admin), slot_controller_1.SlotController.deleteSlot);
exports.SlotRoutes = router;
