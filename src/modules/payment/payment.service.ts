/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { BookingModel } from "../booking/booking.model";
import { verifyPayment } from "./payment.utils";
import AppError from "../../errors/AppError";
import { RoomModel } from "../room/room.model";
import { SlotModel } from "../slot/slot.model";
import { join } from "path";
import { readFileSync } from "fs";

const confirmationService = async (
  transactionId?: string | undefined,
  payload?: string | undefined,
) => {
  const res = await verifyPayment(transactionId);

  let result;
  let message = "";

  if (res && res.pay_status === "Successful") {
    if (!payload) {
      throw new AppError(httpStatus.BAD_REQUEST, "Payload is missing");
    }

    const parsedPayload = JSON.parse(payload);
    const { slots, date, room, user } = parsedPayload.payload;

    const isRoomExist = await RoomModel.findOne({ _id: room });

    if (!isRoomExist) {
      throw new AppError(httpStatus.NOT_FOUND, "Room does not exist");
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

    await BookingModel.findByIdAndUpdate(booking._id, {
      paymentStatus: "paid",
    });

    result = await BookingModel.findById(booking._id)
      .populate("room")
      .populate("user")
      .populate("slots");

    message = "Payment and booking successful";

    const filePath = join(__dirname, "../../../views/confirmation.html");
    let template = readFileSync(filePath, "utf-8");

    template = template.replace("{{message}}", message);

    return template;
  } else {
    const message = "Payment failed";
    const filePath = join(__dirname, "../../../views/failConfirmation.html");

    let template;
    try {
      template = readFileSync(filePath, "utf-8");
    } catch (error) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to load failConfirmation template",
      );
    }

    template = template.replace("{{message}}", message);
    return template;
  }
};

export const paymentService = {
  confirmationService,
};
