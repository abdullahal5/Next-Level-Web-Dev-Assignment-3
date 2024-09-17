"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
            message: "Invalid ObjectId",
        }),
        slots: zod_1.z.array(zod_1.z.string()),
        user: zod_1.z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
            message: "Invalid ObjectId",
        }),
        date: zod_1.z.string().refine((date) => {
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            return regex.test(date);
        }, {
            message: "Invalid date format, expected 'YYYY-MM-DD'",
        }),
        totalAmount: zod_1.z.number().optional(),
        isConfirmed: zod_1.z.enum(["unconfirmed", "confirmed", "cancelled"]).optional(),
        isDeleted: zod_1.z.boolean().optional(),
        paymentStatus: zod_1.z.string().optional(),
    }),
});
const updateBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z
            .string()
            .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
            message: "Invalid ObjectId",
        })
            .optional(),
        slots: zod_1.z.array(zod_1.z.string()).optional(),
        user: zod_1.z
            .string()
            .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
            message: "Invalid ObjectId",
        })
            .optional(),
        date: zod_1.z
            .string()
            .refine((date) => {
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            return regex.test(date);
        }, {
            message: "Invalid date format, expected 'YYYY-MM-DD'",
        })
            .optional(),
        totalAmount: zod_1.z.number().optional(),
        isConfirmed: zod_1.z.enum(["unconfirmed", "confirmed", "cancelled"]).optional(),
        isDeleted: zod_1.z.boolean().optional(),
        paymentStatus: zod_1.z.string().optional(),
    }),
});
exports.BookingValidation = {
    createBookingValidationSchema,
    updateBookingValidationSchema,
};
