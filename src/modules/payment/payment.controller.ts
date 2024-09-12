import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import SendResponse from "../../utils/sendResponse";

const confirmationController = catchAsync(async (req, res) => {
  const { transactionId, payload } = req.query;
  const result = await paymentService.confirmationService(
    transactionId as string,
    payload as string,
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${result}`,
    data: result,
  });
});

export const paymentController = {
  confirmationController,
};
