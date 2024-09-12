import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.registerUser,
);

router.post(
  "/login",
  validateRequest(UserValidation.loginUserValidationSchema),
  UserController.loginUser,
);

router.post("/refresh-token", UserController.refreshToken);

export const UserRoutes = router;
