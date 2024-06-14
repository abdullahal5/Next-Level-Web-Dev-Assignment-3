import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const registerUser = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await UserService.createUserIntoDB(body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await UserService.loginUser(body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export const UserController = {
  registerUser,
  loginUser,
};
