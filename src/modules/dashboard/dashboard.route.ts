import express from "express";
import auth from "../../middlewares/auth";
import { User_Role } from "../../interface";
import { dashboardController } from "./dashboard.controller";

const router = express.Router();

router.get(
  "/dashboard-data",
  auth(User_Role.admin),
  dashboardController.DashboardData,
);

export const DashboardRoute = router;
