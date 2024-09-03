import catchAsync from "../../utils/catchAsync";

const confirmationController = catchAsync(async (req, res) => {
  // console.log(req.query);
  res.redirect(
    `http://localhost:5173/success?transactionId=${req.query.transactionId}&status=success&bookingId=${req.query?.bookingId}`,
  );
});

export const paymentController = {
  confirmationController,
};
