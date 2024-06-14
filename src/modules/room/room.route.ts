import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RoomValidation } from "./room.validation";
import { RoomController } from "./room.controller";
import auth from "../../middlewares/auth";
import { User_Role } from "../../interface";

const router = express.Router();

router.post(
  "/",
  auth(User_Role.admin),
  validateRequest(RoomValidation.createRoomValidationSchema),
  RoomController.createRoom,
);

router.get("/", RoomController.getAllRoom);
router.get("/:id", RoomController.getSingleRoom);
router.put(
  "/:id",
  auth(User_Role.admin),
  validateRequest(RoomValidation.updateRoomValidationSchema),
  RoomController.updateRoom,
);

router.delete("/:id", auth(User_Role.admin), RoomController.deleteRoom);

export const RoomRoutes = router;
