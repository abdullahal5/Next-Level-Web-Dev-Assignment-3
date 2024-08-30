import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    slots: {
      type: [Schema.Types.ObjectId],
      ref: "Slot",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: [String],
      required: true,
    },
    totalAmount: {
      type: Number,
    },
    isConfirmed: {
      type: String,
      default: "unconfirmed",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const BookingModel = model<TBooking>("Booking", bookingSchema);
