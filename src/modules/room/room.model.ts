import { Schema, model } from "mongoose";
import { TRoom } from "./room.interface";

const roomSchema = new Schema<TRoom>(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true
    },
    roomNo: {
      type: Number,
      required: true,
      unique: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    floorNo: {
      type: Number,
      required: true,
    },
    pricePerSlot: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

roomSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const RoomModel = model<TRoom>("Room", roomSchema);
