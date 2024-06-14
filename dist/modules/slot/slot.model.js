"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotModel = void 0;
const mongoose_1 = require("mongoose");
const slotSchema = new mongoose_1.Schema({
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    date: {
        type: String,
        required: true,
        set: function (date) {
            return new Date(date).toISOString().substring(0, 10);
        },
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
});
exports.SlotModel = (0, mongoose_1.model)("Slot", slotSchema);
