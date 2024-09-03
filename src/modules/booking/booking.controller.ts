import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async (req, res) => {
  const body = req.body;
  const { userId } = req.user as JwtPayload;
  const result = await BookingService.createBookingIntoDB(body, userId);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Created successfully!!!",
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookingFromDB();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getMyBooking = catchAsync(async (req, res) => {
  const { userId, role } = req.user as JwtPayload;
  const user = {
    userId,
    role,
  };

  const result = await BookingService.myBookings(user);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking retrieved successfully",
    data: result,
  });
});

const singleBooking = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BookingService.getSingleBookingFromDB(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking retrieved successfully",
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BookingService.updateBookings(id, req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Updated successfully",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BookingService.deleteBookings(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Deleted successfully",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBooking,
  getMyBooking,
  updateBooking,
  deleteBooking,
  singleBooking,
};
