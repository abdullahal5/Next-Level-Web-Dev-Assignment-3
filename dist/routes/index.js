"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const room_route_1 = require("../modules/room/room.route");
const slot_route_1 = require("../modules/slot/slot.route");
const booking_route_1 = require("../modules/booking/booking.route");
const payment_route_1 = require("../modules/payment/payment.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/rooms",
        route: room_route_1.RoomRoutes,
    },
    {
        path: "/slots",
        route: slot_route_1.SlotRoutes,
    },
    {
        path: "",
        route: booking_route_1.BookingRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
