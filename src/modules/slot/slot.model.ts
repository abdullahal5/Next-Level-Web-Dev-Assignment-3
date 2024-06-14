import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema<TSlot>({
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  date: {
    type: String,
    required: true,
    set: function (date: string) {
      return new Date(date).toISOString().substring(0, 10);
    },
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

export const SlotModel = model<TSlot>("Slot", slotSchema);
