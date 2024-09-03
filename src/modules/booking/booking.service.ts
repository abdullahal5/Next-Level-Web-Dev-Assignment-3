import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { SlotModel } from "../slot/slot.model";
import { UserModel } from "../user/user.model";
import { RoomModel } from "../room/room.model";
import { BookingModel } from "./booking.model";
import { TBooking } from "./booking.interface";
import { initiatePayment } from "../payment/payment.utils";
import { Types } from "mongoose";

interface TransactionData {
  bookingId: Types.ObjectId;
  transactionId: string;
  totalPrice: number;
  curtomerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
}

const createBookingIntoDB = async (payload: TBooking, userId: string) => {
  const { slots, date, room, user } = payload;

  const isDateExist = await SlotModel.find({ date: { $in: date } });

  if (!isDateExist || isDateExist.length <= 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not exist in this date");
  }

  const isSlotExist = await SlotModel.find({ _id: { $in: slots } });

  if (isSlotExist.length !== payload.slots.length) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Some slots do not exist in the database. Please enter valid ids",
    );
  }

  const isRoomExist = await RoomModel.findOne({ _id: room });

  if (!isRoomExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Room does not exists");
  }

  const isUserExist = await UserModel.findOne({ _id: user });

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exists");
  }

  if (userId.toString() !== payload.user.toString()) {
    throw new AppError(httpStatus.FORBIDDEN, "Please Provide your own user id");
  }

  const totalAmount = isRoomExist.pricePerSlot * slots.length;

  const tnxID = `TNXID-${Date.now()}`;

  const booking = await BookingModel.create({
    slots,
    date,
    room,
    user,
    totalAmount,
  });

  for (const slot of booking.slots) {
    await SlotModel.findByIdAndUpdate(slot, { isBooked: true }, { new: true });
  }

  const populatedBooking = await BookingModel.findById(booking._id)
    .populate("room")
    .populate("user")
    .populate("slots");

  // console.log(booking._id);

  const paymentData: TransactionData = {
    bookingId: booking._id,
    transactionId: tnxID,
    totalPrice: totalAmount,
    curtomerName: isUserExist.name,
    customerEmail: isUserExist.email,
    customerPhone: isUserExist.phone,
    customerAddress: isUserExist.address,
  };
  const paymentSession = await initiatePayment(paymentData);

  return {
    populatedBooking,
    url: paymentSession.payment_url,
  };

  // return populatedBooking;
};

const getAllBookingFromDB = async () => {
  const result = await BookingModel.find({ isDeleted: false })
    .populate("room")
    .populate("user")
    .populate("slots");

  return result;
};

const getSingleBookingFromDB = async (id: string) => {
  const result = await BookingModel.findById(id)
    .populate("room")
    .populate("slots")
    .populate("user");
  return result;
};

const myBookings = async (user?: { userId: string; role: string }) => {
  const isAuthenticateUser = await UserModel.findOne({ _id: user?.userId });

  if (!isAuthenticateUser) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  if (isAuthenticateUser.role !== user?.role) {
    throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
  }

  const findSpecificBookForUser = await BookingModel.find({
    user: user?.userId,
  })
    .populate("room")
    .populate("user")
    .populate("slots");

  if (!findSpecificBookForUser || findSpecificBookForUser.length <= 0) {
    throw new AppError(httpStatus.FORBIDDEN, "No Data Found");
  }

  return findSpecificBookForUser;
};

const updateBookings = async (id: string, pyaload: Partial<TBooking>) => {
  const isBookingExists = await BookingModel.findById(id);

  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  if (isBookingExists.isDeleted === true) {
    throw new AppError(httpStatus.BAD_REQUEST, "This booking is deleted");
  }

  const result = await BookingModel.findByIdAndUpdate(id, pyaload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBookings = async (id: string) => {
  const checkIsAlreadyDeleted = await BookingModel.findById(id);

  if (!checkIsAlreadyDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  if (checkIsAlreadyDeleted?.isDeleted === true) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This booking is already deleted",
    );
  }

  const result = await BookingModel.findOneAndUpdate(
    checkIsAlreadyDeleted._id,
    {
      isDeleted: true,
    },
    { new: true },
  );

  return result;
};

export const BookingService = {
  createBookingIntoDB,
  getAllBookingFromDB,
  myBookings,
  updateBookings,
  deleteBookings,
  getSingleBookingFromDB,
};
