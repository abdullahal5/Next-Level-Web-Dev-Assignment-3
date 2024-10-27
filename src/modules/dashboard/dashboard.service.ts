import { PipelineStage } from "mongoose";
import { BookingModel } from "../booking/booking.model";
import { RoomModel } from "../room/room.model";
import { SlotModel } from "../slot/slot.model";
import { UserModel } from "../user/user.model";

const GetDashboardData = async () => {
  const totalRoom = await RoomModel.countDocuments({ isDeleted: false });
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
      $match: { paymentStatus: "paid" },
    },
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
      $group: {
        _id: "$roomDetails._id",
        roomName: { $first: "$roomDetails.name" },
        totalRevenue: { $sum: "$totalAmount" },
        totalBookings: { $sum: 1 },
        totalSlots: { $sum: { $size: "$slots" } },
      },
    },
    {
      $sort: { totalRevenue: -1 },
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
