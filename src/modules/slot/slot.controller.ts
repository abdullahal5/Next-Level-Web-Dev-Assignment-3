import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { SlotService } from "./slot.service";

const createSlot = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await SlotService.createSlotIntoDB(body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot Created successfully!!!",
    data: result,
  });
});

const getAllSlot = catchAsync(async (req, res) => {
  let result;
  if (req.query) {
    result = await SlotService.getAllSlotFromDB(req.query);
  } else {
    result = await SlotService.getAllSlotFromDB(req.query);
  }

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots retrieved successfully",
    data: result,
  });
});

const getSingleSlot = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await SlotService.getSingleSlotFromDB(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots retrieved successfully",
    data: result,
  });
});

const updateSlot = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await SlotService.updateSlotIntoDB(id, req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots retrieved successfully",
    data: result,
  });
});

const deleteSlot = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await SlotService.deleteSlotFromDB(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot Deleted successfully",
    data: result,
  });
});

const getMultipleSlots = catchAsync(async (req, res) => {
  const result = await SlotService.getMultipleSlotsFromDB(req.params.ids);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots Deleted Successfully",
    data: result,
  });
});

export const SlotController = {
  updateSlot,
  createSlot,
  getAllSlot,
  getSingleSlot,
  deleteSlot,
  getMultipleSlots,
};
