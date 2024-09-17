import catchAsync from "../../utils/catchAsync";
import { paymentService } from "./payment.service";

const confirmationController = catchAsync(async (req, res) => {
  const { transactionId, payload } = req.query;
  const result = await paymentService.confirmationService(
    transactionId as string,
    payload as string,
  );
  res.send(result)

  // SendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: `${result}`,
  //   data: result,
  // });
});

export const paymentController = {
  confirmationController,
};
