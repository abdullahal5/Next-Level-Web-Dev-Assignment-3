"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const interface_1 = require("../../interface");
const dashboard_controller_1 = require("./dashboard.controller");
const router = express_1.default.Router();
router.get("/dashboard-data", (0, auth_1.default)(interface_1.User_Role.admin), dashboard_controller_1.dashboardController.DashboardData);
exports.DashboardRoute = router;
