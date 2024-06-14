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
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const slot_model_1 = require("../slot/slot.model");
const user_model_1 = require("../user/user.model");
const room_model_1 = require("../room/room.model");
const booking_model_1 = require("./booking.model");
const createBookingIntoDB = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { slots, date, room, user } = payload;
    const isDateExist = yield slot_model_1.SlotModel.find({ date: { $in: date } });
    if (!isDateExist || isDateExist.length <= 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Slot not exist in this date");
    }
    const isSlotExist = yield slot_model_1.SlotModel.find({ _id: { $in: slots } });
    if (isSlotExist.length !== payload.slots.length) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Some slots do not exist in the database. Please enter valid ids");
    }
    const isRoomExist = yield room_model_1.RoomModel.findOne({ _id: room });
    if (!isRoomExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Room does not exists");
    }
    const isUserExist = yield user_model_1.UserModel.findOne({ _id: user });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User does not exists");
    }
    if (userId.toString() !== payload.user.toString()) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Please Provide your own user id");
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
});
const getAllBookingFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.BookingModel.find({ isDeleted: false })
        .populate("room")
        .populate("user")
        .populate("slots");
    return result;
});
const myBookings = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const isAuthenticateUser = yield user_model_1.UserModel.findOne({ _id: user === null || user === void 0 ? void 0 : user.userId });
    if (!isAuthenticateUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    if (isAuthenticateUser.role !== (user === null || user === void 0 ? void 0 : user.role)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized");
    }
    const findSpecificBookForUser = yield booking_model_1.BookingModel.find({
        user: user === null || user === void 0 ? void 0 : user.userId,
    })
        .populate("room")
        .populate("user")
        .populate("slots");
    if (!findSpecificBookForUser || findSpecificBookForUser.length <= 0) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "No Data Found");
    }
    return findSpecificBookForUser;
});
const updateBookings = (id, pyaload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBookingExists = yield booking_model_1.BookingModel.findById(id);
    if (!isBookingExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    if (isBookingExists.isDeleted === true) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This booking is deleted");
    }
    const result = yield booking_model_1.BookingModel.findByIdAndUpdate(id, pyaload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteBookings = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIsAlreadyDeleted = yield booking_model_1.BookingModel.findById(id);
    console.log(checkIsAlreadyDeleted);
    if (!checkIsAlreadyDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    if ((checkIsAlreadyDeleted === null || checkIsAlreadyDeleted === void 0 ? void 0 : checkIsAlreadyDeleted.isDeleted) === true) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This booking is already deleted");
    }
    const result = yield booking_model_1.BookingModel.findOneAndUpdate(checkIsAlreadyDeleted._id, {
        isDeleted: true,
    }, { new: true });
    return result;
});
exports.BookingService = {
    createBookingIntoDB,
    getAllBookingFromDB,
    myBookings,
    updateBookings,
    deleteBookings,
};
