import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TRoom } from "./room.interface";
import { RoomModel } from "./room.model";

const createRoomIntoDB = async (payload: TRoom) => {
  const isRoomExist = await RoomModel.findOne({ roomNo: payload.roomNo });

  if (isRoomExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This ${isRoomExist.roomNo} room is Already Exist`,
    );
  }

  const result = await RoomModel.create(payload);
  return result;
};

const getAllRoomFromDB = async () => {
  const result = await RoomModel.find();
  return result;
};

const getSingleRoomFromDB = async (id: string) => {
  const isRoomExists = await RoomModel.findById(id);

  if (!isRoomExists) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  } else if (isRoomExists.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, "This Room is deleted");
  }

  const result = RoomModel.findById(id);
  return result;
};

const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
  const isRoomExists = await RoomModel.findById(id);

  if (!isRoomExists) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  } else if (isRoomExists.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, "This Room is deleted");
  }

  const result = await RoomModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteRoomFromDB = async (id: string) => {
  const isRoomExists = await RoomModel.findById(id);

  if (!isRoomExists) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  } else if (isRoomExists.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, "This Room is already deleted");
  }

  const deleteRoom = await RoomModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  ).select("-password");

  if (!deleteRoom) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  return deleteRoom;
};

export const RoomService = {
  createRoomIntoDB,
  getAllRoomFromDB,
  getSingleRoomFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
};
