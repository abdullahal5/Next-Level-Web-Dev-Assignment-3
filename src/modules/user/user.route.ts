import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { User_Role } from "../../interface";

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

router.get(
  "/get-user",
  auth(User_Role.admin),
  UserController.getAllUser,
);

export const UserRoutes = router;
