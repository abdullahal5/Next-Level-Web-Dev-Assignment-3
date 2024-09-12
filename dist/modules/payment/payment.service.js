"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const booking_model_1 = require("../booking/booking.model");
const payment_utils_1 = require("./payment.utils");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const room_model_1 = require("../room/room.model");
const slot_model_1 = require("../slot/slot.model");
const confirmationService = (transactionId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, payment_utils_1.verifyPayment)(transactionId);
    if (res && res.pay_status === "Successful") {
        if (!payload) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Payload is missing");
        }
        const parsedPayload = JSON.parse(payload);
        const { slots, date, room, user } = parsedPayload.payload;
        const isRoomExist = yield room_model_1.RoomModel.findOne({ _id: room });
        if (!isRoomExist) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Room does not exists");
        }
        const totalAmount = isRoomExist.pricePerSlot * slots.length;
        const booking = yield booking_model_1.BookingModel.create({
            slots,
            date,
            room,
            user,
            totalAmount,
        });
        for (const slot of booking.slots) {
            yield slot_model_1.SlotModel.findByIdAndUpdate(slot, { isBooked: true }, { new: true });
        }
        const populatedBooking = yield booking_model_1.BookingModel.findById(booking._id)
            .populate("room")
            .populate("user")
            .populate("slots");
        return populatedBooking;
    }
    else {
        return "failed";
    }
});
exports.paymentService = {
    confirmationService,
};
