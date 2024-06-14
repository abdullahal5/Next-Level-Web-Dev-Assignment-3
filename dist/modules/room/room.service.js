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
exports.RoomService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const room_model_1 = require("./room.model");
const createRoomIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isRoomExist = yield room_model_1.RoomModel.findOne({ roomNo: payload.roomNo });
    if (isRoomExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, `This ${isRoomExist.roomNo} room is Already Exist`);
    }
    const result = yield room_model_1.RoomModel.create(payload);
    return result;
});
const getAllRoomFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.RoomModel.find();
    return result;
});
const getSingleRoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isRoomExists = yield room_model_1.RoomModel.findById(id);
    if (!isRoomExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    else if (isRoomExists.isDeleted === true) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This Room is deleted");
    }
    const result = room_model_1.RoomModel.findById(id);
    return result;
});
const updateRoomIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isRoomExists = yield room_model_1.RoomModel.findById(id);
    if (!isRoomExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    else if (isRoomExists.isDeleted === true) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This Room is deleted");
    }
    const result = yield room_model_1.RoomModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteRoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isRoomExists = yield room_model_1.RoomModel.findById(id);
    if (!isRoomExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    else if (isRoomExists.isDeleted === true) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This Room is already deleted");
    }
    const deleteRoom = yield room_model_1.RoomModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).select("-password");
    if (!deleteRoom) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No Data Found");
    }
    return deleteRoom;
});
exports.RoomService = {
    createRoomIntoDB,
    getAllRoomFromDB,
    getSingleRoomFromDB,
    updateRoomIntoDB,
    deleteRoomFromDB,
};
