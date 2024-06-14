"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomValidation = void 0;
const zod_1 = require("zod");
const createRoomValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        roomNo: zod_1.z.number(),
        floorNo: zod_1.z.number(),
        pricePerSlot: zod_1.z.number(),
        amenities: zod_1.z.array(zod_1.z.string()),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const updateRoomValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        roomNo: zod_1.z.number().optional(),
        floorNo: zod_1.z.number().optional(),
        pricePerSlot: zod_1.z.number().optional(),
        amenities: zod_1.z.array(zod_1.z.string()).optional(),
        isDeleted: zod_1.z.boolean().optional().optional(),
    }),
});
exports.RoomValidation = {
    createRoomValidationSchema,
    updateRoomValidationSchema,
};
