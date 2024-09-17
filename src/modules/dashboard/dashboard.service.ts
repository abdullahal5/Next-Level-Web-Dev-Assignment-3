import { PipelineStage } from "mongoose";
import { BookingModel } from "../booking/booking.model";
import { RoomModel } from "../room/room.model";
import { SlotModel } from "../slot/slot.model";
import { UserModel } from "../user/user.model";

const GetDashboardData = async () => {
  const totalRoom = await RoomModel.countDocuments();
  const totalSlots = await SlotModel.countDocuments();
  const totalBook = await BookingModel.countDocuments();
  const totalUser = await UserModel.countDocuments();

  const totalPaidResult = await BookingModel.aggregate([
    { $match: { paymentStatus: "paid" } },
    { $group: { _id: null, totalPaid: { $sum: "$totalAmount" } } },
  ]);

  const totalPaid =
    totalPaidResult.length > 0 ? totalPaidResult[0].totalPaid : 0;

  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: "rooms",
        localField: "room",
        foreignField: "_id",
        as: "roomDetails",
      },
    },
    {
      $unwind: "$roomDetails",
    },
    {
      $lookup: {
        from: "slots",
        localField: "room",
        foreignField: "room",
        as: "slotDetails",
      },
    },
    {
      $unwind: {
        path: "$slotDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$roomDetails._id",
        roomName: { $first: "$roomDetails.name" },
        totalBookings: { $sum: 1 },
        totalAmount: { $sum: "$totalAmount" },
        totalSlots: {
          $sum: { $cond: [{ $ifNull: ["$slotDetails._id", false] }, 1, 0] },
        },
        bookings: {
          $push: {
            bookingId: "$_id",
            user: "$user",
            date: "$date",
            amount: "$totalAmount",
            status: "$paymentStatus",
          },
        },
      },
    },
    {
      $sort: { totalBookings: -1 },
    },
  ];

  const result = await BookingModel.aggregate(pipeline);

  return {
    totalRoom,
    totalSlots,
    totalBook,
    totalPaid,
    totalUser,
    result,
  };
};

export const DashbaordService = {
  GetDashboardData,
};
