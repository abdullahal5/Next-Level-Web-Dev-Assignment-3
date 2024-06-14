import { z } from "zod";

const createSlotValidation = z.object({
  body: z
    .object({
      room: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
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
      startTime: z.string().refine(
        (time) => {
          const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        {
          message: "Invalid time format, expected 'HH:MM' in 24 hours format",
        },
      ),
      endTime: z.string().refine(
        (time) => {
          const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        {
          message: "Invalid time format, expected 'HH:MM' in 24 hours format",
        },
      ),
      isBooked: z
        .boolean({ required_error: "Booking status is required" })
        .optional(),
    })
    .refine((body) => {
      const start = new Date(`1970-01-01T${body.startTime}:00`);
      const end = new Date(`1970-01-01T${body.endTime}:00`);

      return end > start;
    }),
});

export const SlotValidation = {
  createSlotValidation,
};
