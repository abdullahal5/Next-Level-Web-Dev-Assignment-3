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

  return {
    totalRoom,
    totalSlots,
    totalBook,
    totalPaid,
    totalUser
  };
};

export const DashbaordService = {
  GetDashboardData,
};
