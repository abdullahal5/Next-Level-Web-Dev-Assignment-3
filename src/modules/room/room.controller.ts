import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { RoomService } from "./room.service";

const createRoom = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await RoomService.createRoomIntoDB(body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room Created successfully!!!",
    data: result,
  });
});

const getAllRoom = catchAsync(async (req, res) => {
  const result = await RoomService.getAllRoomFromDB(req.query);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rooms retrieved successfully",
    data: result,
  });
});

const getSingleRoom = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await RoomService.getSingleRoomFromDB(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room retrieved successfully",
    data: result,
  });
});

const updateRoom = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await RoomService.updateRoomIntoDB(id, req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room Updated successfully",
    data: result,
  });
});

const deleteRoom = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await RoomService.deleteRoomFromDB(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Room Deleted successfully",
    data: result,
  });
});

export const RoomController = {
  createRoom,
  getAllRoom,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
