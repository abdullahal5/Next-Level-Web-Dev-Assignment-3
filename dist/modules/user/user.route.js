"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const interface_1 = require("../../interface");
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserValidationSchema), user_controller_1.UserController.registerUser);
router.post("/login", (0, validateRequest_1.default)(user_validation_1.UserValidation.loginUserValidationSchema), user_controller_1.UserController.loginUser);
router.post("/refresh-token", user_controller_1.UserController.refreshToken);
router.get("/get-user", (0, auth_1.default)(interface_1.User_Role.admin), user_controller_1.UserController.getAllUser);
exports.UserRoutes = router;
