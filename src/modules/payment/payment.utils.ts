import axios from "axios";
import config from "../../config";
import { Types } from "mongoose";

interface TransactionData {
  bookingId: Types.ObjectId;
  transactionId: string;
  totalPrice: number;
  curtomerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
}

export const initiatePayment = async (payload: TransactionData) => {
  const response = await axios.post(config.PAYMENT_URL!, {
    store_id: config.Store_id,
    signature_key: config.SIGNETURE_KEY,
    tran_id: payload.transactionId,
    success_url: `http://localhost:5000/api/v1/payment/confirmation?transactionId=${payload.transactionId}&status=success&bookingId=${payload.bookingId.toString()}`,
    fail_url: "http://www.merchantdomain.com/faile dpage.html",
    cancel_url: "http://www.merchantdomain.com/can cellpage.html",
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
};
