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

export const SlotController = {
  createSlot,
  getAllSlot,
};
