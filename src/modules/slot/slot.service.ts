/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TSlot } from "./slot.interface";
import { SlotModel } from "./slot.model";
import { addMinutes, getTimeInMinutes } from "./slot.utils";
import mongoose from "mongoose";

const createSlotIntoDB = async (payload: TSlot) => {
  const { room, date, startTime, endTime } = payload;

  const startMinutes = await getTimeInMinutes(startTime);
  const endMinutes = await getTimeInMinutes(endTime);
  const totalDuration = endMinutes - startMinutes;

  const slotDuration = 60;
  const numberOfSlots = Math.floor(totalDuration / slotDuration);

  const slots = [];
  let currentStartTime = startTime;

  for (let i = 0; i < numberOfSlots; i++) {
    const currentEndTime = await addMinutes(currentStartTime, slotDuration);
    slots.push({
      room,
      date,
      startTime: currentStartTime,
      endTime: currentEndTime,
      isBooked: false,
    });
    currentStartTime = currentEndTime;
  }

  const result = await SlotModel.create(slots);
  return result;
};

const getAllSlotFromDB = async (query?: { date?: string; roomId?: string }) => {
  let result: any;

  if (query && Object.keys(query).length > 0) {
    const { date, roomId } = query;
    const filter: any = {};

    if (date) {
      filter.date = { $in: date };
    }
    if (roomId) {
      filter.room = { $in: roomId };
    }

    filter.isBooked = false;

    result = await SlotModel.find(filter).populate("room");

    if (result.length <= 0) {
      throw new AppError(httpStatus.OK, "No Data Found");
    }
  } else {
    result = await SlotModel.find({ isBooked: false }).populate("room");
  }

  return result;
};

const getSingleSlotFromDB = async (id: string) => {
  const isRoomExists = await SlotModel.findById(id);

  if (!isRoomExists) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  const result = SlotModel.findById(id);
  return result;
};

const updateSlotIntoDB = async (id: string, payload: Partial<TSlot>) => {
  const isSlotExists = await SlotModel.findById(id);

  if (!isSlotExists) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  const result = await SlotModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSlotFromDB = async (id: string) => {
  const isRoomExists = await SlotModel.findById(id);

  if (!isRoomExists) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  const deleteSlot = await SlotModel.findByIdAndDelete(id, { new: true });

  if (!deleteSlot) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  return deleteSlot;
};

const getMultipleSlotsFromDB = async (ids: string | string[]) => {
  const idArray = Array.isArray(ids) ? ids : ids.split(",");

  const objectIds = idArray.map((id) => new mongoose.Types.ObjectId(id.trim()));

  const slots = await SlotModel.find({ _id: { $in: objectIds } });

  if (slots.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  return slots;
};

export const SlotService = {
  updateSlotIntoDB,
  createSlotIntoDB,
  getAllSlotFromDB,
  getSingleSlotFromDB,
  deleteSlotFromDB,
  getMultipleSlotsFromDB,
};
