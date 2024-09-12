import httpStatus from "http-status";
import { BookingModel } from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";
import AppError from "../../errors/AppError";
import { RoomModel } from "../room/room.model";
import { SlotModel } from "../slot/slot.model";

const confirmationService = async (
  transactionId?: string | undefined,
  payload?: string | undefined,
) => {
  const res = await verifyPayment(transactionId);

  if (res && res.pay_status === "Successful") {
    if (!payload) {
      throw new AppError(httpStatus.BAD_REQUEST, "Payload is missing");
    }

    const parsedPayload = JSON.parse(payload);
    const { slots, date, room, user } = parsedPayload.payload;

    const isRoomExist = await RoomModel.findOne({ _id: room });

    if (!isRoomExist) {
      throw new AppError(httpStatus.NOT_FOUND, "Room does not exists");
    }

    const totalAmount = isRoomExist.pricePerSlot * slots.length;

    const booking = await BookingModel.create({
      slots,
      date,
      room,
      user,
      totalAmount,
    });

    for (const slot of booking.slots) {
      await SlotModel.findByIdAndUpdate(
        slot,
        { isBooked: true },
        { new: true },
      );
    }

    const populatedBooking = await BookingModel.findById(booking._id)
      .populate("room")
      .populate("user")
      .populate("slots");

    return populatedBooking;
  } else {
    return "failed";
  }
};
export const paymentService = {
  confirmationService,
};
