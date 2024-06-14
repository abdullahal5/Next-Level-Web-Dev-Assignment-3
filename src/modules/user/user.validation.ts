import { z } from "zod";
import { Roles } from "./user.constant";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(25, "Name length should be less than 25"),
    email: z.string().email("Invalid email format").trim(),
    password: z.string(),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z.enum([...Roles] as [string, ...string[]]),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format").trim(),
    password: z.string(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  loginUserValidationSchema,
};
