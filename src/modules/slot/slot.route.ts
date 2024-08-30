import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { User_Role } from "../../interface";
import { SlotController } from "./slot.controller";
import { SlotValidation } from "./slot.validation";

const router = express.Router();

router.post(
  "/",
  auth(User_Role.admin),
  validateRequest(SlotValidation.createSlotValidation),
  SlotController.createSlot,
);
router.get("/:id", SlotController.getSingleSlot);
router.get("/", SlotController.getAllSlot);
router.put("/:id", auth(User_Role.admin), SlotController.updateSlot);
router.delete("/:id", auth(User_Role.admin), SlotController.deleteSlot);

export const SlotRoutes = router;
