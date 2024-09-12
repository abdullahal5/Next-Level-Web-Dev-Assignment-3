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
exports.verifyPayment = exports.initiatePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const initiatePayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(config_1.default.PAYMENT_URL, {
        store_id: config_1.default.Store_id,
        signature_key: config_1.default.SIGNETURE_KEY,
        tran_id: payload.transactionId,
        success_url: `http://localhost:5000/api/v1/payment/confirmation?transactionId=${payload.transactionId}&status=success&payload=${encodeURIComponent(JSON.stringify(payload))}&userId=${payload.userId}`,
        fail_url: `http://localhost:5000/api/v1/payment/confirmation?transactionId=${payload.transactionId}&status=failed`,
        cancel_url: "http://localhost:5173",
        amount: payload.totalPrice,
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: payload.curtomerName,
        cus_email: payload.customerEmail,
        cus_add1: payload.customerAddress,
        cus_add2: payload.customerAddress,
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1206",
        cus_country: "Bangladesh",
        cus_phone: payload.customerPhone,
        type: "json",
    });
    return response.data;
});
exports.initiatePayment = initiatePayment;
const verifyPayment = (tnxId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(config_1.default.VERIFY_URL, {
            params: {
                store_id: config_1.default.Store_id,
                signature_key: config_1.default.SIGNETURE_KEY,
                type: "json",
                request_id: tnxId,
            },
        });
        return response.data;
    }
    catch (err) {
        throw new Error("Payment validation failed!");
    }
});
exports.verifyPayment = verifyPayment;
