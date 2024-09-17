import { z } from "zod";

const createBookingValidationSchema = z.object({
  body: z.object({
    room: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: "Invalid ObjectId",
    }),
    slots: z.array(z.string()),
    user: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: "Invalid ObjectId",
    }),
    date: z.string().refine(
      (date) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(date);
      },
      {
        message: "Invalid date format, expected 'YYYY-MM-DD'",
      },
    ),
    totalAmount: z.number().optional(),
    isConfirmed: z.enum(["unconfirmed", "confirmed", "cancelled"]).optional(),
    isDeleted: z.boolean().optional(),
    paymentStatus: z.string().optional(),
  }),
});

const updateBookingValidationSchema = z.object({
  body: z.object({
    room: z
      .string()
      .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
        message: "Invalid ObjectId",
      })
      .optional(),
    slots: z.array(z.string()).optional(),
    user: z
      .string()
      .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
        message: "Invalid ObjectId",
      })
      .optional(),
    date: z
      .string()
      .refine(
        (date) => {
          const regex = /^\d{4}-\d{2}-\d{2}$/;
          return regex.test(date);
        },
        {
          message: "Invalid date format, expected 'YYYY-MM-DD'",
        },
      )
      .optional(),
    totalAmount: z.number().optional(),
    isConfirmed: z.enum(["unconfirmed", "confirmed", "cancelled"]).optional(),
    isDeleted: z.boolean().optional(),
    paymentStatus: z.string().optional(),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
