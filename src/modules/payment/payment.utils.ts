import axios from "axios";
import config from "../../config";
import { TBooking } from "../booking/booking.interface";

interface TransactionData {
  transactionId: string;
  totalPrice: number;
  curtomerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  payload: TBooking;
  userId: string;
}

export const initiatePayment = async (payload: TransactionData) => {
  const response = await axios.post(config.PAYMENT_URL!, {
    store_id: config.Store_id,
    signature_key: config.SIGNETURE_KEY,
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
};

export const verifyPayment = async (tnxId: string | undefined) => {
  try {
    const response = await axios.get(config.VERIFY_URL!, {
      params: {
        store_id: config.Store_id,
        signature_key: config.SIGNETURE_KEY,
        type: "json",
        request_id: tnxId,
      },
    });

    return response.data;
  } catch (err) {
    throw new Error("Payment validation failed!");
  }
};
