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
exports.SlotService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const slot_model_1 = require("./slot.model");
const slot_utils_1 = require("./slot.utils");
const mongoose_1 = __importDefault(require("mongoose"));
const createSlotIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { room, date, startTime, endTime } = payload;
    const startMinutes = yield (0, slot_utils_1.getTimeInMinutes)(startTime);
    const endMinutes = yield (0, slot_utils_1.getTimeInMinutes)(endTime);
    const totalDuration = endMinutes - startMinutes;
    const slotDuration = 60;
    const numberOfSlots = Math.floor(totalDuration / slotDuration);
    const slots = [];
    let currentStartTime = startTime;
    for (let i = 0; i < numberOfSlots; i++) {
        const currentEndTime = yield (0, slot_utils_1.addMinutes)(currentStartTime, slotDuration);
        slots.push({
            room,
            date,
            startTime: currentStartTime,
            endTime: currentEndTime,
            isBooked: false,
        });
        currentStartTime = currentEndTime;
    }
    const result = yield slot_model_1.SlotModel.create(slots);
    return result;
});
const getAllSlotFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (query && Object.keys(query).length > 0) {
        const { date, roomId } = query;
        const filter = {};
        if (date) {
            filter.date = { $in: date };
        }
        if (roomId) {
            filter.room = { $in: roomId };
        }
        filter.isBooked = false;
        result = yield slot_model_1.SlotModel.find(filter).populate("room");
        if (result.length <= 0) {
            throw new AppError_1.default(http_status_1.default.OK, "No Data Found");
        }
    }
    else {
        result = yield slot_model_1.SlotModel.find({ isBooked: false }).populate("room");
    }
    return result;
});
const getSingleSlotFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isRoomExists = yield slot_model_1.SlotModel.findById(id);
    if (!isRoomExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    const result = slot_model_1.SlotModel.findById(id);
    return result;
});
const updateSlotIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isSlotExists = yield slot_model_1.SlotModel.findById(id);
    if (!isSlotExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    const result = yield slot_model_1.SlotModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteSlotFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isRoomExists = yield slot_model_1.SlotModel.findById(id);
    if (!isRoomExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    const deleteSlot = yield slot_model_1.SlotModel.findByIdAndDelete(id, { new: true });
    if (!deleteSlot) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    return deleteSlot;
});
const getMultipleSlotsFromDB = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const idArray = Array.isArray(ids) ? ids : ids.split(",");
    const objectIds = idArray.map((id) => new mongoose_1.default.Types.ObjectId(id.trim()));
    const slots = yield slot_model_1.SlotModel.find({ _id: { $in: objectIds } });
    if (slots.length === 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    return slots;
});
exports.SlotService = {
    updateSlotIntoDB,
    createSlotIntoDB,
    getAllSlotFromDB,
    getSingleSlotFromDB,
    deleteSlotFromDB,
    getMultipleSlotsFromDB,
};
