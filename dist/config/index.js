"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    port: process.env.PORT,
    databse_url: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    Bcrypt_Salt_Round: process.env.Bcrypt_Salt_Round,
    Access_Token: process.env.Access_token,
    Refresh_Token: process.env.Refresh_token,
    Jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    Jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    Store_id: process.env.STORE_ID,
    SIGNETURE_KEY: process.env.SIGNETURE_KEY,
    BASE_URL: process.env.BASE_URL,
    PAYMENT_URL: process.env.PAYMENT_URL,
    Client_URL: process.env.clientURI,
    VERIFY_URL: process.env.VERIFY_URL,
    FrontEnd_URL: process.env.FrontEnd_URL,
    Backend_URL: process.env.Backend_URL
};
