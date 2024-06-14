import { z } from "zod";

const createRoomValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    roomNo: z.number(),
    floorNo: z.number(),
    pricePerSlot: z.number(),
    amenities: z.array(z.string()),
    isDeleted: z.boolean().optional(),
  }),
});

const updateRoomValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    roomNo: z.number().optional(),
    floorNo: z.number().optional(),
    pricePerSlot: z.number().optional(),
    amenities: z.array(z.string()).optional(),
    isDeleted: z.boolean().optional().optional(),
  }),
});

export const RoomValidation = {
  createRoomValidationSchema,
  updateRoomValidationSchema,
};
