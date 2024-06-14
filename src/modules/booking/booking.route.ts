import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { User_Role } from "../../interface";
import { BookingController } from "./booking.controller";
import { BookingValidation } from "./booking.validation";

const router = express.Router();

router.post(
  "/bookings",
  auth(User_Role.user),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingController.createBooking,
);

router.get("/bookings", auth(User_Role.admin), BookingController.getAllBooking);
router.get(
  "/my-bookings",
  auth(User_Role.user),
  BookingController.getMyBooking,
);
router.put(
  "/bookings/:id",
  auth(User_Role.admin),
  validateRequest(BookingValidation.updateBookingValidationSchema),
  BookingController.updateBooking,
);

router.delete(
  "/bookings/:id",
  auth(User_Role.admin),
  BookingController.deleteBooking,
);

export const BookingRoutes = router;
