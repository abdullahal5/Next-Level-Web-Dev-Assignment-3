import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { DashbaordService } from "./dashboard.service";

const DashboardData = catchAsync(async (req, res) => {
  const result = await DashbaordService.GetDashboardData();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard Data is fetched Successfull",
    data: result,
  });
});

export const dashboardController = {
  DashboardData,
};
