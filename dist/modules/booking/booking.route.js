"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const interface_1 = require("../../interface");
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.post("/bookings", (0, auth_1.default)(interface_1.User_Role.user), 
// validateRequest(BookingValidation.createBookingValidationSchema),
booking_controller_1.BookingController.createBooking);
router.get("/bookings", (0, auth_1.default)(interface_1.User_Role.admin), booking_controller_1.BookingController.getAllBooking);
router.get("/my-bookings", (0, auth_1.default)(interface_1.User_Role.user), booking_controller_1.BookingController.getMyBooking);
router.get("/bookings/:id", booking_controller_1.BookingController.singleBooking);
router.put("/bookings/:id", (0, auth_1.default)(interface_1.User_Role.admin), (0, validateRequest_1.default)(booking_validation_1.BookingValidation.updateBookingValidationSchema), booking_controller_1.BookingController.updateBooking);
router.delete("/bookings/:id", (0, auth_1.default)(interface_1.User_Role.admin), booking_controller_1.BookingController.deleteBooking);
exports.BookingRoutes = router;
