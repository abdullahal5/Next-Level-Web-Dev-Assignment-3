"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    slots: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Slot",
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: String,
        required: true,
        set: function (date) {
            return new Date(date).toISOString().substring(0, 10);
        },
    },
    totalAmount: {
        type: Number,
    },
    isConfirmed: {
        type: String,
        default: "unconfirmed",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.BookingModel = (0, mongoose_1.model)("Booking", bookingSchema);
