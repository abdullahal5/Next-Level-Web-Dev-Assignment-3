"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const user_utility_1 = require("./user.utility");
const config_1 = __importDefault(require("../../config"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.UserModel.findOne({ email: payload.email });
    if (isUserExists) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This email is Already Exists!!!");
    }
    const newUser = yield user_model_1.UserModel.create(payload);
    const result = yield user_model_1.UserModel.findById(newUser._id).select("-password");
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield user_model_1.UserModel.findOne({ email: email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found please Register!!!");
    }
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user._id,
        name: user === null || user === void 0 ? void 0 : user.name,
        email: user === null || user === void 0 ? void 0 : user.email,
        profileImage: user === null || user === void 0 ? void 0 : user.profileImage,
        role: user === null || user === void 0 ? void 0 : user.role,
        address: user === null || user === void 0 ? void 0 : user.address,
        phone: user === null || user === void 0 ? void 0 : user.phone,
        _id: user === null || user === void 0 ? void 0 : user._id,
    };
    const accessToken = (0, user_utility_1.createToken)(jwtPayload, config_1.default.Access_Token, config_1.default.Jwt_access_expires_in);
    const refreshToken = (0, user_utility_1.createToken)(jwtPayload, config_1.default.Refresh_Token, config_1.default.Jwt_refresh_expires_in);
    const checkPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!checkPassword) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Please enter valid password");
    }
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = (0, user_utility_1.verifyToken)(refreshToken, config_1.default.Refresh_Token);
    const isUserExist = yield user_model_1.UserModel.findOne({ email: decoded === null || decoded === void 0 ? void 0 : decoded.email });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found. Please register");
    }
    const jwtPayload = {
        userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id,
        name: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.name,
        email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
        profileImage: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.profileImage,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
        address: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.address,
        phone: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.phone,
        _id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id,
    };
    const accessToken = (0, user_utility_1.createToken)(jwtPayload, config_1.default.Access_Token, config_1.default.Jwt_access_expires_in);
    return {
        accessToken,
    };
});
const getAllUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const checkAdmin = user.role === "admin";
    if (!checkAdmin) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not authorized!!!");
    }
    const result = yield user_model_1.UserModel.find();
    return result;
});
exports.UserService = {
    createUserIntoDB,
    loginUser,
    refreshToken,
    getAllUser,
};
