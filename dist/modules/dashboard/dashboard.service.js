"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashbaordService = void 0;
const booking_model_1 = require("../booking/booking.model");
const room_model_1 = require("../room/room.model");
const slot_model_1 = require("../slot/slot.model");
const user_model_1 = require("../user/user.model");
const GetDashboardData = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalRoom = yield room_model_1.RoomModel.countDocuments();
    const totalSlots = yield slot_model_1.SlotModel.countDocuments();
    const totalBook = yield booking_model_1.BookingModel.countDocuments();
    const totalUser = yield user_model_1.UserModel.countDocuments();
    const totalPaidResult = yield booking_model_1.BookingModel.aggregate([
        { $match: { paymentStatus: "paid" } },
        { $group: { _id: null, totalPaid: { $sum: "$totalAmount" } } },
    ]);
    const totalPaid = totalPaidResult.length > 0 ? totalPaidResult[0].totalPaid : 0;
    const pipeline = [
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
    const result = yield booking_model_1.BookingModel.aggregate(pipeline);
    return {
        totalRoom,
        totalSlots,
        totalBook,
        totalPaid,
        totalUser,
        result,
    };
});
exports.DashbaordService = {
    GetDashboardData,
};
