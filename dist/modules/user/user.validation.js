"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(1, "Name is required")
            .max(25, "Name length should be less than 25"),
        email: zod_1.z.string().email("Invalid email format").trim(),
        password: zod_1.z.string(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        role: zod_1.z.enum([...user_constant_1.Roles]),
    }),
});
const loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid email format").trim(),
        password: zod_1.z.string(),
    }),
});
exports.UserValidation = {
    createUserValidationSchema,
    loginUserValidationSchema,
};
