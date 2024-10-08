import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { RoomRoutes } from "../modules/room/room.route";
import { SlotRoutes } from "../modules/slot/slot.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { DashboardRoute } from "../modules/dashboard/dashboard.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/rooms",
    route: RoomRoutes,
  },
  {
    path: "/slots",
    route: SlotRoutes,
  },
  {
    path: "",
    route: BookingRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/dashboard",
    route: DashboardRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
